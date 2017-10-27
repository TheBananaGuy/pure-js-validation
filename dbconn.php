<?php
// ini_set ("session.use_trans_sid", true);
session_start();
@mysql_connect("dbLocation", "username", "password")
	or die (mysql_error());
@mysql_select_db("dbName")
	or die (mysql_error());
?>