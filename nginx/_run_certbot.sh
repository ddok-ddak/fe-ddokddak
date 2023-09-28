docker run -it --rm --name certbot \
        -v "/etc/letsencrypt:/etc/letsencrypt" \
        -v "/var/lib/letsencrypt:/var/lib/letsencrypt" \
	    -v "/var/log/letsencrypt:/var/log/letsencrypt" \
        certbot/certbot \
	    certonly --webroot -w /var/lib/letsencrypt \
	    -d dodonenow.com --agree-tos