# Purpose

The purpose of this directory and the files held within is to hold certificates from the certificate chain of the cert that will be presented by the dev deployment. The purpose of each file can be found below:

- entrust_g2_ca.crt.pem: Root certificate for the chain in PEM format
- entrust_l1k.crt.pem: Intermediary certificate for the chain in PEM format
- entrust_chain.crt.pem: Both the root and the intermediary certificates in the same file so that they can both easily be passed as Node Extra Certs
