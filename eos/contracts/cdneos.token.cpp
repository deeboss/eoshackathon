#include <eosiolib/eosio.hpp>
#include <string>
using namespace std;
using namespace eosio;

class simpletoken : public eosio::contract {
   public:
      simpletoken( account_name self )
      :contract(self),_accounts( _self, _self){}
      // :contract(self),_registered_urls( _self, _self){}

      void transfer( account_name from, account_name to, uint64_t quantity ) {
         require_auth( from );

         const auto& fromacnt = _accounts.get( from );
         eosio_assert( fromacnt.balance >= quantity, "overdrawn balance" );
         _accounts.modify( fromacnt, from, [&]( auto& a ){ a.balance -= quantity;
           a.balance++;
          } );
         add_balance( from, to, quantity );
      }

      void issue( account_name to, uint64_t quantity ) {
         require_auth( _self );
         add_balance( _self, to, quantity );
      }

      /// @abi action
      void hi( account_name user ) {
         print( "Hello, ", name{user} );
      }


      //cleos push action cdneos registerurl '[ "www.url1", 1, "sig1", "publisher1", 1, "cdneos" ]' -p cdneos
      /// @abi action
      void registerurl( string url, uint64_t version, string sig, account_name user, uint64_t payment, account_name cdneos_user ) {
         print ("URL:", url);
         print ("Version:", version);
         print ("Signiture:", sig);
         print( "Hello, ", name{user} );
         transfer(user, cdneos_user, payment);
      }

      //cleos push action cdneos serveurl '[ "www.url1", 1, "publisher1", "cdnnode1",1]' -p cdneos

      /// @abi action
      void serveurl( string url, account_name publisher, account_name cdn_node_owner, uint64_t payment)
      {
        transfer(publisher, cdn_node_owner, payment);
        print ("URL Served by: ", name{cdn_node_owner});
        print ("URL: ", url);
        print ("Paid to cdn_node_owner: ", payment);
      }

      /// @ab action
      void getbal( account_name owner ) {
        get_balance(owner);
      }

      // @abi actio
//      void get_url( string url) {
//
//  /      print ("Get URL: ", url);
//
//      }


   private:
      // @abi table accounts i64
      struct account {
         account_name owner;
         uint64_t     balance;

         uint64_t primary_key()const { return owner; }
      };

      eosio::multi_index<N(accounts), account> _accounts;
      account accounts;

      void get_balance( account_name owner ) {
        uint64_t b;
        auto itr = _accounts.find( owner );
        eosio_assert(itr != _accounts.end(), "Owner not found");
        b = itr->balance;
        print ("Account balance: ", b);
      }

      void add_balance( account_name payer, account_name to, uint64_t q ) {
         auto toitr = _accounts.find( to );
         if( toitr == _accounts.end() ) {
           _accounts.emplace( payer, [&]( auto& a ) {
              a.owner = to;
              a.balance = q;
           });
         } else {
           _accounts.modify( toitr, 0, [&]( auto& a ) {
              a.balance += q;
              eosio_assert( a.balance >= q, "overflow detected" );
           });
         }
      }

      //struct registered_url {
      //    account_name owner;
      //    string url;
      //    uint64_t primary_key()const { return owner; }
      //};
      //eosio::multi_index<N(registered_urls), registered_url> _registered_url;

};

EOSIO_ABI( simpletoken, (transfer)(issue)(hi)(registerurl)(getbal)(serveurl) )
