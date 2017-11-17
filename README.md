# catmjs
Open source Crypto ATM. Currently supports BTC, LTC, more coming soon. Currently prototyping on a raspbery pi, will update with complete list of components...


# Run
1. Clone Repo
2. npm install
3. node server.js
4. chromium-browser --kisok http://localhost:3000

You can run it on any computer the pi is just really cheap!

# Hardware
- Raspberry Pi 3 ($35)
- Raspbery Pi 7 inch touch screen ($75)
- Camera module, used for scanning QR codes ($25)
- Cash Acceptor... not sure from where, Ben knows this..
- Case 




# Troubleshooting
### Blurry video in chromium
1. sudo modprobe bcm2835-v4l2 gst_v4l2src_is_broken=1
