<?
/*
    neat_r works like print_r but with much less visual clutter.
    By Jake Lodwick. Copy freely.
 */
function neat_r($arr, $return = false) {
    $out = array();
    $oldtab = "    ";
    $newtab = "  ";

    $lines = explode("\n", print_r($arr, true));

    foreach ($lines as $line) {

        //remove numeric indexes like "[0] =>" unless the value is an array
        if (substr($line, -5) != "Array") {
            $line = preg_replace("/^(\s*)\[[0-9]+\] => /", "$1", $line, 1);
        }

        //garbage symbols
        foreach (array(
            "Array"        => "",
            "["            => "",
            "]"            => "",
            " =>"        => ":",
        ) as $old => $new) {
            $out = str_replace($old, $new, $out);
        }

        //garbage lines
