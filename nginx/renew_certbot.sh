docker run --rm --name certbot \ 
-v "/var/log/letsencrypt:/var/log/letsencrypt" \ 
-v "/etc/letsencrypt:/etc/letsencrypt" \ 
-v "/var/lib/letsencrypt:/var/lib/letsencrypt" \ 
certbot/certbot renew >> ~/dodone/front/nginx/certbot_renew.log

docker restart dd_front