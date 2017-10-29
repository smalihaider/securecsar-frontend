# securecsar

securecsar is a prototype built to secure TOSCA Cloud Service Archives (CSARs). The prototype is part of research work of master's thesis "Securing Cloud Service Archives for Function and Data Shipping in Industrial Environments" done at University of Stuttgart, Germany (IAAS Department). The prototype allows to provide security to TOSCA CSAR by defining policies in CSAR. The prototpye provides security to CSAR by implementing following use-cases.

1. encrypt all CSAR artifacts (default case) or individual artifacts in a CSAR
1. sign all CSAR artifacts (default case) or individual artifacts in a CSAR
1. verify all CSAR artifacts (default case) or individual artifacts in a CSAR
1. decrypt all CSAR artifacts (default case) or individual artifacts in a CSAR

The implementation of prototype consists of two projects:
1. securecsar-frontend (https://github.com/smalihaider/securecsar-frontend.git) (contains Web based GUI to call REST services)- CURRENT REPOSITORY
1. securecsar (https://github.com/smalihaider/securecsar.git) (contains services)

# securecsar (front-end application)
This project is a web-based (containing html and javascripts files) graphical user interface application which runs on grunt server. The project calls encrypt, sign, verify, and decrypt REST endpoints in securecsar project (https://github.com/smalihaider/securecsar.git).

You can easily setup the securecsar-frontend project to have GUI for securecsar REST webervices with the following steps:

1. Checkout this repository.
1. Install GIT client (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
1. Setup Node.js on your machine (https://nodejs.org/en/)
1. Go to the directory where the repository has been checkout, we call this directory securecscar-frontend.
1. Execute "npm install" (this downloads all nodejs dependencies)
1. Execute "npm install bower" (this installs bower)
1. Execute "bower install" (this downloads all dependencies managed by the bower)
1. Copy folder securecscar-frontend/bower_components to securecscar-frontend/app
1. Execute "grunt install
1. Set hostname of securecsar service (REST endpoint) in the following files (replace **localhost** with the new hostname). 
   1. <securecscar-frontend>/deploy.json
   1. <securecscar-frontend>/app/scrivpts/config.js
   1. <securecscar-frontend>/app/app_components/DecryptCSAR/decryptcsarController.js
   1. <securecscar-frontend>/app/app_components/EncryptCSAR/encryptcsarController.js
   1. <securecscar-frontend>/app/app_components/SignCSAR/signcsarController.js

By default it is set at http://localhost:8080. So no need for this step, if securecsar-frontend and securecsar services are running on the same machine and server of securecsar services is configured at port 8080.

More information of this prototype is included in scripture of the master's thesis "Securing Cloud Service Archives for Function and Data Shipping in Industrial Environments".
