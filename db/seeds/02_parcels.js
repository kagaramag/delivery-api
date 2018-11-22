
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('parcels').del()
    .then(function () {
      // Inserts seed entries
      return knex('parcels').insert([
        {
          "id": 1,
          "id_client": 1,
          "id_postman": 4,
          "title": "1 molestie tellus. Aenean egestas hendrerit neque. In ornare sagittis felis.",
          "description": "est, congue a, aliquet vel,",
          "weight": 1,
          "state": "created ",
          "pickup": "porttitor vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo",
          "dropoff": "porta elit, a feugiat tellus lorem eu metus. In lorem.",
          "distance": 1
        },
        {
          "id": 2,
          "id_client": 1,
          "id_postman": 6,
          "title": "2 sem magna nec quam. Curabitur vel lectus. Cum sociis natoque",
          "description": "consectetuer mauris id sapien. Cras dolor dolor, tempus non,",
          "weight": 8,
          "state": " in_transit ",
          "pickup": "sagittis. Nullam vitae diam. Proin dolor. Nulla semper tellus id",
          "dropoff": "sit amet, dapibus id, blandit at, nisi. Cum sociis natoque",
          "distance": 3
        },
        {
          "id": 3,
          "id_client": 2,
          "id_postman": 8,
          "title": "auctor velit. Aliquam nisl. Nulla eu neque pellentesque massa lobortis",
          "description": "nec ante blandit viverra. Donec tempus, lorem fringilla ornare",
          "weight": 6,
          "state": " delivered",
          "pickup": "hendrerit a, arcu. Sed et libero. Proin mi. Aliquam gravida",
          "dropoff": "tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla. Integer",
          "distance": 6
        }
      ]);
    });
};
