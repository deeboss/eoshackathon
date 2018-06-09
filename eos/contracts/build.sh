cleos wallet unlock -n rafal --password PW5J5cXz33Ri3q5n8cgNirZ5r8GrwHN2RA2aebrPDfn78wxgcBEub
eosiocpp -o cdneos.token.wasl cdneos.token.cpp 
eosiocpp -g cdneos.token.abi cdneos.token.cpp 
cleos set contract cdneos ../cdneos.token -p cdneos
