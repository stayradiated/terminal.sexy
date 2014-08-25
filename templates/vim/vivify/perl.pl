package Dancer::Handler::Standalone;

use strict;
use warnings;

use HTTP::Server::Simple::PSGI;
use base 'Dancer::Handler', 'HTTP::Server::Simple::PSGI';

use Dancer::HTTP;
ome/maurice/fishsticks.pm[+] unix PERL 9/22
        $dancer->run();
    }
}

sub print_startup_info {
    my $pid    = shift;
    my $ipaddr = setting('server');
    my $port   = setting('port');

    # we only print the info if we need to
    setting('startup_info') or return;

    # bare minimum
    print STDERR ">> Dancer $Dancer::VERSION server $pid listening " .
                 "on http://$ipaddr:$port\n";

    # all loaded plugins
    foreach my $module ( grep { $_ =~ m{^Dancer/Plugin/} } keys %INC ) {
        $module =~ s{/}{::}g;  # change / to ::
