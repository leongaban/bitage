BitAge dashboard
======

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/leongaban/dashboard?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
<strong>Dashboard for a Bitcoin asset overview app</strong>

Demo: http://nodedallas.io/apps/bitage-dashboard/

- [x] Style early mockup
- [x] Get data from mock Angular $scope
- [x] Get user input to add new accounts
- [x] Select address on click
- [x] Add label field (type of account/icons)
- [x] Setup Express app
- [x] User avatar options dropdown
- [x] Mockup "Settings" (profile + fileupload)
- [x] Hide avatar dropdown after click
- [x] Solve multiple ng-animation effects issue
- [x] Mockup "Settings" (security & email)
- [ ] User welcome to wallet experience
- [ ] Allow editing accounts (account API)
- [ ] Allow deleting accounts (account API)
- [ ] Calculate total
- [ ] Use Blockchain api to get balance
- [ ] Wire up Blockchain transactions (recieve & send)
- [ ] Generate real QR code
- [ ] Allow reorganizing account
- [ ] Wireup data (Mongoose)

Running
------
<p>install dependencies:</p>
    $ cd bitage-app && npm install

<p>run the app:</p>
    $ DEBUG=bitage-app ./bin/www


What is Bitcoin?
------
* https://www.youtube.com/watch?v=Gc2en3nHxA4
* The future of money

PS: [Click here](https://gitter.im/settings/badger/opt-out) if you would prefer not to receive automatic pull-requests from Gitter in future.
