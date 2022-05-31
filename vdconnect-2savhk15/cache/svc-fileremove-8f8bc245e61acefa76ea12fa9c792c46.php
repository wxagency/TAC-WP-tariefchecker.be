<?php defined('SVC_HOST') || exit(); define('SVC_CLIENTLIB', '1.5.11'); define('STAMPFORMAT', 'Y-m-d H:i:s'); $slashes = function_exists('preg_match') && preg_match('/%(2f|5c)/i', $_SERVER['QUERY_STRING']); foreach (array_keys($_GET) as $_) if (strlen($_) > 3 && substr($_, 0, 3) !== 'svc' && is_string($_GET[$_])) { if ($slashes) $_GET[$_] = strtr($_GET[$_], array('%2f' => '/', '%2F' => '/', '%5c' => '\\', '%5C' => '\\')); inlineDecode($_GET[$_]); } if ($_POST) foreach (array_keys($_POST) as $_) if (is_string($_POST[$_])) inlineDecode($_POST[$_]); unset($slashes); $flags = isset($_GET['svcflags']) ? (int)$_GET['svcflags'] : 0; $options = svcGlobalOptions(); if ($options['flags'] !== $flags) { $options['flags'] = $flags; svcGlobalOptions($options); } unset($flags, $options); function svcDataQuery($svc = '', $section = '', $params = NULL, $options = NULL, &$cached = NULL) { if (!is_array($options)) $options = array(); $options['gzip'] = isset($options['gzip']) && $options['gzip']; $options['json'] = isset($options['json']) && $options['json']; $options['cacheReload'] = isset($options['cacheReload']) && $options['cacheReload']; $options['cacheTime'] = isset($options['cacheTime']) ? abs((int)$options['cacheTime']) : 300; $options['cacheFile'] = isset($options['cacheFile']) ? (string)$options['cacheFile'] : ''; $options['cacheClean'] = isset($options['cacheClean']) && $options['cacheClean']; $cacheable = $options['cacheTime'] && strlen($options['cacheFile']); $cached = $cacheable && !$options['cacheReload'] && is_file($options['cacheFile']) && filesize($options['cacheFile']) && (filemtime($options['cacheFile']) + $options['cacheTime'] >= time()); if ($cached) { $rawdata = file_get_contents($options['cacheFile']); if (is_string($rawdata) && (($data = svcDataQueryDecode($rawdata, $options['gzip'], $options['json'])) !== FALSE)) { $options['cacheClean'] && @unlink($options['cacheFile']); return $data; } else { @unlink($options['cacheFile']); } } $cached = FALSE; $url = SVC_QDATA.(strlen($svc) ? $svc.'/' : '').(strlen($section) ? $section.(substr($section, -1) === '/' ? '' : '.php') : '').'?'.SVC_QBASE .(is_array($params) && $params ? '&'.http_build_query($params) : (is_string($params) && strlen($params) ? '&'.$params : '')); $rawdata = defined('SVC_USECURL') && SVC_USECURL && curl_setopt($GLOBALS['svcCURL'], CURLOPT_URL, $url) ? curl_exec($GLOBALS['svcCURL']) : @file_get_contents($url, 0, $GLOBALS['svcContext']); if (!is_string($rawdata) || (($data = svcDataQueryDecode($rawdata, $options['gzip'], $options['json'])) === FALSE)) return FALSE; if ($cacheable) if ($options['cacheClean'] || (@file_put_contents($options['cacheFile'], $rawdata, LOCK_EX) !== strlen($rawdata))) if (is_file($options['cacheFile'])) @unlink($options['cacheFile']); return $data; } function svcDataQueryDecode($data, $gzip = TRUE, $json = TRUE) { if (!is_string($data)) return FALSE; if ($gzip) { $data = @gzinflate($data); if (!is_string($data)) return FALSE; } if ($json) { $data = @json_decode($data, TRUE); if ($data === FALSE || $data === NULL) return FALSE; } return $data; } function inlineDecode(&$s) { $pfx = (string)substr($s, 0, 5); if (!$p = strpos($pfx, ':')) return TRUE; $pfx = substr($pfx, 0, $p); switch ($pfx) { case 'B64': $s = base64_decode(substr($s, $p + 1)); return is_string($s); case 'HEX': $s = pack('H*', substr($s, $p + 1)); return is_string($s); case 'JSON': $s = json_decode(substr($s, $p + 1), TRUE); return $s !== NULL; } return TRUE; } function svcGlobalOptions($save = NULL) { $file = './'.SVC_CDIR.'/options'; static $cache; if (is_array($save) && $save) { $cache = $save; return file_put_contents($file, gzdeflate(json_encode($save))) && TRUE; } if ($cache) return $cache; if ( is_file($file) && ($data = file_get_contents($file)) && ($data = gzinflate($data)) && is_array($data = json_decode($data, TRUE)) && isset($data['flags']) ) { $cache = $data; return $data; } $cache = array('flags' => 0); return $cache; } function formatDirName($path, $cDir = './', $rootDir = '/', $strict = FALSE) { $path = strtr(trim($path), '\\', '/'); $drive = ''; if (($_ = strpos($path, ':')) !== FALSE) { $drive = substr($path, 0, $_ + 1); $path = substr($path, $_ + 1); } $root = strlen($path) && $path[0] === '/' ? '/' : ''; $path = explode('/', trim($path, '/')); $ret = array(); foreach ($path as $part) if (strlen($part) && $part !== '.') if ($part === '..' && ($strict || ($ret && end($ret) !== '..'))) array_pop($ret); else $ret[] = $part; $ret = $root.implode('/', $ret); if (!strlen($ret)) return $drive.$cDir; elseif ($ret === '/') return $drive.$rootDir; else return $drive.$ret.'/'; } function splitTextLines($text, $skipEmpty = TRUE, $trimLines = TRUE, $addSplitChars = NULL) { $tr = array("\r" => ''); if (is_string($addSplitChars)) for ($i = 0, $l = strlen($addSplitChars); $i < $l; ++$i) $tr[$addSplitChars[$i]] = "\n"; $textTr = strtr($text, $tr); if (!( $skipEmpty || $trimLines )) return explode("\n", $textTr); $ret = array(); foreach (explode("\n", $textTr) as $v) { if ($trimLines) $v = trim($v); if (!$skipEmpty || strlen($v)) $ret[] = $v; } return $ret; } function removeDir($entry, &$counter = NULL, &$size = NULL, $contentsOnly = FALSE) { if (!strlen($entry)) return FALSE; if (!is_dir($entry) || is_link($entry)) { ++$counter; $size += (float)filesize($entry); return unlink($entry); } $entry .= '/'; if (!$dh = opendir($entry)) return FALSE; $err = FALSE; while (($obj = readdir($dh)) !== FALSE) if ($obj !== '.' && $obj !== '..') if (!removeDir($entry.$obj, $counter, $size, FALSE)) $err = TRUE; closedir($dh); if (!$contentsOnly && !$err) if (!rmdir($entry)) $err = TRUE; return !$err; } function file_safe_rewrite($filename, $data, $lock = FALSE, $context = NULL) { if (!is_string($data)) return FALSE; clearstatcache(); $exists = is_file($filename); if ($exists) { $fmode = (int)fileperms($filename); $backup = $filename.'.tmp'.rand(100, 999); if (!rename($filename, $backup)) return FALSE; } if (file_put_contents($filename, $data, $lock ? LOCK_EX : 0, $context) >= strlen($data)) { if ($exists) { unlink($backup); $fmode && chmod($filename, $fmode); } return TRUE; } else { is_file($filename) && unlink($filename); if ($exists) { rename($backup, $filename); $fmode && chmod($filename, $fmode); } return FALSE; } } function sortFileList($a, $b) { $ad = $a[0][strlen($a[0])-1] === '/'; $bd = $b[0][strlen($b[0])-1] === '/'; if ($ad && $bd) return strcmp($a[0], $b[0]); elseif ($ad) return -1; elseif ($bd) return 1; $_ = strcmp(pathinfo($a[0], PATHINFO_EXTENSION), pathinfo($b[0], PATHINFO_EXTENSION)); if ($_) return $_; else return strcmp($a[0], $b[0]); } function getUserInfo($uid, $part = 'name', $default = '') { if (is_int($uid) && function_exists('posix_getpwuid') && ($user = posix_getpwuid($uid)) && isset($user[$part])) return $user[$part]; return $default; } function getGroupInfo($gid, $part = 'name', $default = '') { if (is_int($gid) && function_exists('posix_getgrgid') && ($group = posix_getgrgid($gid)) && isset($group[$part])) return $group[$part]; return $default; } function shortNumber($num, $precision = 2, $delimiter = ' ', $base = 1024) { $pfx = array('', 'k', 'M', 'G', 'T', 'P', 'E', 'Z', 'Y'); $num = (float)$num; $pow = $num ? min((int)log(abs($num), $base), count($pfx) - 1) : 0; return round($num / pow($base, $pow), $precision).$delimiter.$pfx[$pow]; } function shortNumberParse($str, $base = 1024) { $str = strtoupper(trim((string)$str)); $num = (float)$str; if (!$num) return $num; $pow = array('K' => 1, 'M' => 2, 'G' => 3, 'T' => 4, 'P' => 5, 'E' => 6, 'Z' => 7, 'Y' => 8); for ($i = strlen($str) - 1; $i >= 0; --$i) if (isset($pow[$str[$i]])) $num *= pow($base, $pow[$str[$i]]); elseif (is_numeric($str[$i])) break; return $num; } define('DSCAN_FILES', 1); define('DSCAN_DIRFIRST', 2); define('DSCAN_DIRLAST', 4); define('DSCAN_DOTS', 8); define('DSCAN_INCLUDEBASE', 16); define('DSCAN_FOLLOWLINKS', 32); define('DSCAN_NORMAL', DSCAN_FILES | DSCAN_DIRFIRST); class dirScanner { const version = '1.4.2'; protected $basedir = ''; protected $base = FALSE; protected $cd = ''; protected $flags = 0; protected $maxDepth = 0; protected $last = ''; protected $depth = -1; protected $h = array(); public static function create($dir, $flags = DSCAN_NORMAL, $maxDepth = 64) { $class = __CLASS__; $object = new $class(); if ($object->open($dir, $flags, $maxDepth)) return $object; else { unset($object); return FALSE; }; } public function __destruct() { $this->close(); } public function open($dir, $flags = DSCAN_NORMAL, $maxDepth = 64) { $this->close(); if (!strlen($dir)) $dir = './'; elseif ($dir[strlen($dir)-1] !== '/') $dir .= '/'; $this->basedir = ($dir === './') ? '' : $dir; $this->flags = (int)$flags; $this->base = ($this->flags & DSCAN_INCLUDEBASE) > 0; $this->maxDepth = $maxDepth; if ($this->h[0] = @opendir($dir)) { $this->depth = 0; return TRUE; } else { $this->h = array(); return FALSE; }; } public function close() { while ($this->depth >= 0) { $this->h[$this->depth] && closedir($this->h[$this->depth]); $this->depth--; }; $this->reset(); } protected function reset() { $this->basedir = ''; $this->base = FALSE; $this->cd = ''; $this->flags = 0; $this->maxDepth = 0; $this->last = ''; $this->depth = -1; $this->h = array(); } public function cdUp() { if ($this->depth < 0) return FALSE; $this->h[$this->depth] && closedir($this->h[$this->depth]); unset($this->h[$this->depth]); $this->depth--; if ($this->depth < 0) { $this->reset(); return FALSE; }; $this->cd = dirname($this->cd); if (in_array($this->cd, array('.', '/', '\\'))) $this->cd = ''; elseif (strlen($this->cd)) $this->cd .= '/'; return TRUE; } public function cd() { return $this->cd; } public function baseDir() { return $this->basedir; } public function depth() { return $this->depth; } public function last() { return $this->last; } public function isDir() { return strlen($this->last) && ($this->last[strlen($this->last)-1] === '/'); } public function isLink() { return strlen($this->last) && is_link(($this->base ? '' : $this->basedir).$this->last); } public function read() { if ($this->depth < 0) return FALSE; while (TRUE) if ( !$this->h[$this->depth] || (($name = readdir($this->h[$this->depth])) === FALSE) ) { $cd = $this->cd; if (!$this->cdUp()) return FALSE; if ($this->flags & DSCAN_DIRLAST) return $this->last = ($this->base ? $this->basedir : '').$cd; } elseif (is_dir($this->basedir.$this->cd.$name) && (!is_link($this->basedir.$this->cd.$name) || ($this->flags & DSCAN_FOLLOWLINKS))) { if ($name === '.' || $name === '..') if ( ($this->flags & DSCAN_DOTS) && ($this->flags & (DSCAN_DIRFIRST | DSCAN_DIRLAST)) ) return $this->last = ($this->base ? $this->basedir : '').$this->cd.$name.'/'; else continue; $this->depth++; $this->cd .= $name.'/'; if ($this->depth > $this->maxDepth) $this->h[$this->depth] = FALSE; else $this->h[$this->depth] = @opendir($this->basedir.$this->cd); if ($this->flags & DSCAN_DIRFIRST) return $this->last = ($this->base ? $this->basedir : '').$this->cd; } else { if ($this->flags & DSCAN_FILES) return $this->last = ($this->base ? $this->basedir : '').$this->cd.$name; }; } public static function scan(&$list, $baseDir = '', $dirName = '', $flags = DSCAN_NORMAL, $callback = NULL, $filter = NULL) { if (!$cb = isset($callback) && is_callable($callback)) if (!is_array($list)) $list = array(); if (strlen($baseDir) && ($baseDir[strlen($baseDir)-1] !== '/')) $baseDir .= '/'; if (strlen($dirName) && ($dirName[strlen($dirName)-1] !== '/')) $dirName .= '/'; $dir = $baseDir.$dirName; if (!$dh = @opendir(strlen($dir) ? $dir : './')) return FALSE; $ret = 0; while (($name = readdir($dh)) !== FALSE) { $entry = (($flags & DSCAN_INCLUDEBASE) ? $baseDir : '').$dirName.$name; if ($name === '.' || $name === '..') { if ( ($flags & DSCAN_DOTS) && ($flags & (DSCAN_DIRFIRST | DSCAN_DIRLAST)) ) ++$ret && ($cb ? $callback($entry.'/') : ($list[] = $entry.'/')); } elseif (is_dir($dir.$name) && (!is_link($dir.$name) || ($flags & DSCAN_FOLLOWLINKS))) { if ($flags & DSCAN_DIRFIRST) ++$ret && ($cb ? $callback($entry.'/') : ($list[] = $entry.'/')); $ret += self::scan($list, $baseDir, $dirName.$name.'/', $flags, $callback, $filter); if ($flags & DSCAN_DIRLAST) ++$ret && ($cb ? $callback($entry.'/') : ($list[] = $entry.'/')); } elseif (!$filter || preg_match($filter, $name)) { if ($flags & DSCAN_FILES) ++$ret && ($cb ? $callback($entry) : ($list[] = $entry)); }; }; closedir($dh); return $ret; } }; if (!( isset($_GET['filelist']) && strlen($_GET['filelist']) && ($filelist = splitTextLines($_GET['filelist'], TRUE, TRUE, '|')) )) return ERR_SVC + 0; $onlyList = isset($_GET['onlylist']); $files = array(); $cdPath = realpath('.'); if (!is_string($cdPath)) return ERR_SVC + 1; for ($i = 0, $count = count($filelist); $i < $count; ++$i) { $files[$i] = array($filelist[$i], 0, 0, 0, '', '', ''); if (!file_exists($files[$i][0]) || !is_string($realPath = realpath($files[$i][0])) || (strpos($realPath, $cdPath) !== 0) || (strlen($realPath) <= strlen($cdPath))) { $files[$i][6] = 'N'; continue; }; if (is_dir($realPath)) { $files[$i][0] = rtrim($files[$i][0], '\\/').'/'; } else { $files[$i][0] = rtrim($files[$i][0], '\\/'); $files[$i][1] = filesize($realPath); }; $files[$i][2] = filemtime($realPath); $files[$i][3] = fileperms($realPath); $files[$i][4] = getUserInfo(fileowner($realPath)); $files[$i][5] = getGroupInfo(filegroup($realPath)); if ($onlyList) continue; if (@removeDir($realPath, $c, $s)) { $files[$i][6] = 'D'; $files[$i][1] = $s; } else { $files[$i][6] = 'E'; }; }; echo json_encode($files); ?>