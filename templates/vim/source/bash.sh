# Source global definitions
if [ -f /etc/bashrc ]; then
        . /etc/bashrc
fi
#
# aliases
alias grpe=grep
alias grep='grep --color --line-number'
alias vim="vim -p"
alias rebash="source ~/.bashrc"

alias install='sudo apt-get -y install'
alias search='apt-cache search'
alias purge='sudo apt-get purge'

export EDITOR=vim

# set up the prompt to the hostname
shopt -s checkwinsize
PS1="\e[1;35m[\w]   ---   \@ \d \n$>\[\e[0m\]"
PS2="\e[1;35m->\[\e[0m\]"

#--------------------------------------------------
#    grabs some definitions from google
#--------------------------------------------------
define () {
 lynx -dump "http://www.google.com/search?hl=en&q=define%3A+${1}" | grep -m 25 -w "*"  | sed 's/;/ -/g' | cut -d- -f5 > /tmp/templookup.txt
             if [[ -s  /tmp/templookup.txt ]] ;then
                 until ! read response
                     do
