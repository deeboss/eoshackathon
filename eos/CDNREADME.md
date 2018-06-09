EOS Notes:

Installation:

rafal@rafal:~/eos/build$ sudo make install


Commands:

curl http://127.0.0.1:8888/v1/chain/get_info


Starting:

cd ~/eos/build && nodeos -e -p eosio --config=config.ini --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin

nodeos -e -p eosio --config=config.ini --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console

Wallets

Rafal
PW5J5cXz33Ri3q5n8cgNirZ5r8GrwHN2RA2aebrPDfn78wxgcBEub

ls ~/eosio-wallet/

cleos wallet create

cleos wallet open

cleos wallet unlock

keosd Service

changed port to 8899
keosd$ cleos --wallet-url=http://localhost:8899 wallet unlock -n rafal


Keys

cleos create key  # Owner key, full controll over the account
Private key: 5K5ZVwzqo3AFFpdrwr6BAZYhXFtHuRZPs7U99AokBJ6zMjC3ocf
Public key: EOS5qVoJRSydCULinRBTTKinTrMRbyuD5RBUktM2EYxizjT7YEwN6

# Active Authority, active key equates to full access over funds in your account.
Private key: 5JRNfqrCrMkm6SXKeL4jWiZ8gsNqAgc9HCNE7qMLF8BuTQt3Jee
Public key: EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww

cleos wallet import 5K5ZVwzqo3AFFpdrwr6BAZYhXFtHuRZPs7U99AokBJ6zMjC3ocf -n rafal

cleos wallet keys

Accounts

cleos --wallet-url=http://localhost:8899 create account eosio rafal EOS5qVoJRSydCULinRBTTKinTrMRbyuD5RBUktM2EYxizjT7YEwN6 EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww


Contracts

rafal@rafal:~/eos$ cleos wallet unlock -n rafal
password: Unlocked: rafal
rafal@rafal:~/eos$ cleos set contract eosio build/contracts/eosio.bios -p eosio


cdneos

cleos wallet unlock -n rafal --password PW5J5cXz33Ri3q5n8cgNirZ5r8GrwHN2RA2aebrPDfn78wxgcBEub

cleos set contract cdneos ../cdneos.token -p cdneos



# The contract account
cleos create account eosio cdneos EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww


# The publisher accounts
cleos create account eosio publisher1 EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww
cleos create account eosio publisher2 EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww
cleos create account eosio publisher3 EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww

# The nodes Accounts
cleos create account eosio cdnnode1 EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww
cleos create account eosio cdnnode2 EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww
cleos create account eosio cdnnode3 EOS7iYp3PebHzAgTZ6JqLpjoF1hkWj2McJtVrCz37PsxQCfbTi5Ww


cleos push action cdneos  issue '[ "publisher1", "1000" ]' -p cdneos
cleos push action cdneos  issue '[ "publisher2", "1000" ]' -p cdneos
cleos push action cdneos  issue '[ "publisher3", "1000" ]' -p cdneos

cleos push action cdneos getbal '[ "publisher1" ]' -p cdneos

cleos push action cdneos transfer '[ "rafal","user", 100 ]' -p rafal


# Get Balance
cleos push action cdneos getbal '[ "publisher1" ]' -p cdneos

cleos push action cdneos getbal '[ "cdnnode1" ]' -p cdneos

# Register new URL to CDN
cleos push action cdneos registerurl '[ "www.hex.com", 1, "sig1", "publisher1", 1, "cdneos" ]' -p publisher1

# Call whenever CDN Node serves content
cleos push action cdneos serveurl '[ "www.url1", "publisher1", "cdnnode1",1]' -p publisher1


# Run EOS

sudo nodeos -e -p eosio --config=config.ini --plugin eosio::chain_api_plugin --plugin eosio::history_api_plugin --contracts-console --filter-on cdneos:registerurl:
