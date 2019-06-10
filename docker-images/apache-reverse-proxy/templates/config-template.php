<?php
    $dynamic_app = getenv('DYNAMIC_APP');
    $static_app  = getenv('STATIC_APP');
    
    $dynamic_app2 = getenv('DYNAMIC_APP2');
    $static_app2  = getenv('STATIC_APP2');
?>

<VirtualHost *:80>
    
    ServerName lab.res.ch

    <Proxy "balancer://dynamicset">
        BalancerMember 'http://<?php print "$dynamic_app"?>'
        BalancerMember 'http://<?php print "$dynamic_app2"?>'
    </Proxy>

    Header add Set-Cookie "ROUTEID=.%{BALANCER_WORKER_ROUTE}e; path=/" env=BALANCER_ROUTE_CHANGED

    <Proxy "balancer://staticset">
        BalancerMember 'http://<?php print "$static_app"?>' route=1
        BalancerMember 'http://<?php print "$static_app2"?>'route=2
        ProxySet stickysession=ROUTEID
    </Proxy>


    ProxyPass '/api/country/' 'balancer://dynamicset/'
    ProxyPassReverse '/api/country/' 'balancer://dynamicset/'

    
    ProxyPass '/' 'balancer://staticset/'
    ProxyPassReverse '/' 'balancer://staticset/'
    
</VirtualHost>

