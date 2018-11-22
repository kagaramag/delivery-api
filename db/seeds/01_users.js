
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {
          "id": 1,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "lacus@ametconsectetuer.edu",
          "password": "6253",
          "state": "inactive",        
        },
        {
          "id": 2,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "cursus.Nunc.mauris@augueutlacus.org",
          "password": "7774",
          "state": "active",         
        },
        {
          "id": 3,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "dolor.tempus.non@Morbisitamet.net",
          "password": "7487",
          "state": "active",
        },
        {
          "id": 4,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "urna@arcuVivamussit.com",
          "password": "7582",
          "state": "inactive",
        },
        {
          "id": 5,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "lobortis@telluseu.edu",
          "password": "5419",
          "state": "active",        
        },
        {
          "id": 6,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "ornare@Maurisvestibulumneque.ca",
          "password": "3514",
          "state": "active",
        },
        {
          "id": 7,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "montes@luctussitamet.com",
          "password": "7889",
          "state": "active",          
        },
        {
          "id": 8,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "metus.sit.amet@blanditat.com",
          "password": "4291",
          "state": "inactive",        
        },
        {
          "id": 9,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "purus.Nullam.scelerisque@necmetusfacilisis.org",
          "password": "4217",
          "state": "active",           
        },
        {
          "id": 10,
          "name": "Eric, Dan, Peter, Gildas",
          "email": "Mauris.non@mi.ca",
          "password": "8485",
          "state": "active",          
        }
      ]);
    });
};
