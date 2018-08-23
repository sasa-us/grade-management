<?php

$sdbc = null;  

//start session
function open_session()
{
    global $sdbc;      
    $sdbc = mysqli_connect('localhost', 'root', 'root', 'grade-management');    //test db
    if (!$sdbc) {
        return false;
    }
    return true;
}

//close session
function close_session()
{
    global $sdbc;
    return mysqli_close($sdbc);
}

//read session
function read_session($sid)
{
    global $sdbc;
    $sql = sprintf("SELECT data FROM sessions WHERE id='%s'", mysqli_real_escape_string($sdbc, $sid));
    $result = mysqli_query($sdbc, $sql);
    if (mysqli_num_rows($result) == 1) {
        list($data) = mysqli_fetch_array($result, MYSQLI_NUM);
        return $data;
    } else {
        return '';
    }
}

//write session data
function write_session($sid, $data)
{
    global $sdbc;
    $sql = sprintf("INSERT INTO sessions(id,data,last_accessed) 
                         VALUES('%s','%s','%s')", 
                         mysqli_real_escape_string($sdbc, $sid), 
                         mysqli_real_escape_string($sdbc, $data), 
                         date("Y-m-d H:i:s", time())
                  );
    $result = mysqli_query($sdbc, $sql);
    if (!$result) {
        return false;
    }
    return true;
}

//destroy session
function destroy_session($sid)
{
    global $sdbc;
    $sql = sprintf("DELETE FROM sessions WHERE id='%s'", mysqli_real_escape_string($sdbc, $sid));
    $result = mysqli_query($sdbc, $sql);
    $_SESSION = array();
    if (!mysqli_affected_rows($sdbc) == 0) {
        return false;
    }
    return true;
}

//clean old session
function clean_session($expire)
{
    global $sdbc;
    $sql = sprintf("DELETE FROM sessions WHERE DATE_ADD(last_accessed,INTERVAL %d SECOND)<NOW()", (int)$expire);
    $result = mysqli_query($sdbc, $sql);
    if (!$result) {
        return false;
    }
    return true;
}

//tell PHP use session process function 
session_set_save_handler('open_session', 'close_session', 'read_session', 
                        'write_session', 'destroy_session', 'clean_session');

//start session after session_set_save_handler()，otherwise the function cannot work
session_start();