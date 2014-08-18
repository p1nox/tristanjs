'use strict';

var mongo = require('./mongo'),
    ObjectID = mongo.ObjectID;

/**
 * Populates the database with seed data.
 * @param overwrite Overwrite existing database even if it is not empty.
 */
module.exports = function *(overwrite) {
  var count = yield mongo.users.count({}, {limit: 1});
  if (overwrite || count === 0) {

    // first remove any leftover data in collections
    var collerrmsg = 'ns not found' /* indicates 'collection not found' error in mongo which is ok */;
    for (var collection in mongo) {
      if (mongo[collection].drop) {
        try {
          yield mongo[collection].drop();
        } catch (err) {
          if (err.message !== collerrmsg) {
            throw err;
          }
        }
      }
    }

    // now populate collections with fresh data
    yield mongo.counters.insert({_id: 'userId', seq: users.length});
    yield mongo.users.insert(users);
    yield mongo.remDas.insert(remDas);
  }
};

// declare seed data
var users = [
  {
    _id: 1,
    email: 'chuck@tristan.com',
    password: 'pass',
    name: 'Chuck Tristan',
    picture: '/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABVAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6QkU0QUI3Q0Y1RkFCRTExMTk2QzdBM0EwMkJFQ0QwMEYiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUFBMjNFNUE4RTc3MTFFMjhDNjhBMTVGNkExNzJFN0IiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUFBMjNFNTk4RTc3MTFFMjhDNjhBMTVGNkExNzJFN0IiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDo3ODNGQUQ2MEFFNjIxMUUxODdCMEVGOURDRkNGMDBGRiIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDo3ODNGQUQ2MUFFNjIxMUUxODdCMEVGOURDRkNGMDBGRiIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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'
  },
  {
    _id: 2,
    email: 'rpino@tristan.com',
    password: 'pass',
    name: 'Raul Pino',
    picture: ''
  }
];

var remDas = [
  {
    _id: 1,
    url: '/curriculum/linkedin.json',
    userId: 2,
    content: '{\n    "bio": {\n        "firstName": "Raul",\n        "lastName": "Pino",\n        "email": {\n            "personal": "ipinoraul@gmail.com"\n        },\n        "phone": {},\n        "summary": "An agile software developer with 6 years of experience, and a thirst for knowledge and\\nexperimentation on the web, nowadays working on both backend and\\nfrontend environments.\\n\\nHeart-entrepreneur of many projects, developing some of\\nthem, while others reside in the back burner.\\n\\nAlso a wannabe researcher generally on topics like Machine Learning and\\nLinked Data.",\n        "location": {\n            "city": "Chile",\n            "countryCode": "CL"\n        }\n    },\n    "work": [{\n        "company": "Groupon LatAm",\n        "position": "Software Engineer",\n        "startDate": "2013-07",\n        "summary": "Moving Groupon’s U.S. and European web traffic from a Ruby on Rails application to a new Node.js stack."\n    }, {\n        "company": "Pickista",\n        "position": "Senior Developer",\n        "startDate": "2013-01"\n    }, {\n        "company": "Alphadeville",\n        "position": "Technology Fellow",\n        "startDate": "2012-11",\n        "endDate": "2013-08"\n    }, {\n        "company": "has_many :developers",\n        "position": "Senior Developer",\n        "startDate": "2012-10",\n        "endDate": "2013-07"\n    }, {\n        "company": "has_many :developers",\n        "position": "Junior Developer",\n        "startDate": "2011-09",\n        "endDate": "2012-09"\n    }, {\n        "company": "Integra Consultores",\n        "position": "Java Developer",\n        "startDate": "2010-08",\n        "endDate": "2011-09"\n    }, {\n        "company": "Superintendencia de Seguros SUDESEG",\n        "position": "Java Developer",\n        "startDate": "2009-10",\n        "endDate": "2010-08"\n    }, {\n        "company": "Universidad de Los Andes",\n        "position": "Web Developer",\n        "startDate": "2008-12",\n        "endDate": "2009-06"\n    }, {\n        "company": "Universidad Centroccidental Lisandro Alvarado",\n        "position": "Web Developer (Intern)",\n        "startDate": "2008-11",\n        "endDate": "2009-03"\n    }],\n    "education": [{\n        "institution": "Universidad Simón Bolívar",\n        "startDate": "2011",\n        "endDate": "2013",\n        "area": "Artificial Intelligence, Database",\n        "summary": "* Unfinished studies.",\n        "studyType": "Master in Computer Science",\n        "courses": []\n    }, {\n        "institution": "Universidad Centro Occidental \'Lisandro Alvarado\'",\n        "startDate": "2003",\n        "endDate": "2009",\n        "studyType": "Computer Engineering",\n        "courses": []\n    }],\n    "skills": [{\n        "name": "JavaScript",\n        "keywords": []\n    }, {\n        "name": "Java",\n        "keywords": []\n    }, {\n        "name": "HTML",\n        "keywords": []\n    }, {\n        "name": "Ruby",\n        "keywords": []\n    }, {\n        "name": "Ruby on Rails",\n        "keywords": []\n    }, {\n        "name": "Git",\n        "keywords": []\n    }, {\n        "name": "CSS",\n        "keywords": []\n    }, {\n        "name": "jQuery",\n        "keywords": []\n    }, {\n        "name": "PostgreSQL",\n        "keywords": []\n    }, {\n        "name": "MySQL",\n        "keywords": []\n    }, {\n        "name": "Algorithm Design",\n        "keywords": []\n    }, {\n        "name": "Backbone.js",\n        "keywords": []\n    }, {\n        "name": "C++",\n        "keywords": []\n    }, {\n        "name": "SQL",\n        "keywords": []\n    }, {\n        "name": "Extreme Programming",\n        "keywords": []\n    }, {\n        "name": "Agile Methodologies",\n        "keywords": []\n    }, {\n        "name": "CoffeeScript",\n        "keywords": []\n    }, {\n        "name": "GWT",\n        "keywords": []\n    }, {\n        "name": "Angularjs",\n        "keywords": []\n    }, {\n        "name": "Sinatra",\n        "keywords": []\n    }, {\n        "name": "Node.js",\n        "keywords": []\n    }, {\n        "name": "PHP",\n        "keywords": []\n    }, {\n        "name": "C",\n        "keywords": []\n    }, {\n        "name": "JSP",\n        "keywords": []\n    }, {\n        "name": "SVN",\n        "keywords": []\n    }, {\n        "name": "Hibernate",\n        "keywords": []\n    }, {\n        "name": "ZK",\n        "keywords": []\n    }, {\n        "name": "Tomcat",\n        "keywords": []\n    }, {\n        "name": "Apache",\n        "keywords": []\n    }, {\n        "name": "Qt",\n        "keywords": []\n    }, {\n        "name": "Spring",\n        "keywords": []\n    }, {\n        "name": "Algorithm Analysis",\n        "keywords": []\n    }, {\n        "name": "Facebook, Twitter, Google Books, and LinkedIn API",\n        "keywords": []\n    }, {\n        "name": "Express.js",\n        "keywords": []\n    }, {\n        "name": "Oracle",\n        "keywords": []\n    }, {\n        "name": "Groovy",\n        "keywords": []\n    }, {\n        "name": "Artificial Intelligence",\n        "keywords": []\n    }, {\n        "name": "Social Network Analysis",\n        "keywords": []\n    }, {\n        "name": "MongoDB",\n        "keywords": []\n    }, {\n        "name": "Spinejs",\n        "keywords": []\n    }, {\n        "name": "Machine Learning",\n        "keywords": []\n    }, {\n        "name": "Linked Data",\n        "keywords": []\n    }, {\n        "name": "PhoneGap/Cordova",\n        "keywords": []\n    }],\n    "references": [{\n        "name": "Héctor Cen",\n        "reference": "Excelente profesional, dedicado al manejo de tecnologías de punta en el desarrollo ágil y web."\n    }, {\n        "name": "Arsenio Perez",\n        "reference": "Raul es un excelente profesional del area de ingeniería de software. Durante su desempeño en la Dirección de Educación a Distancia de la UCLA realizó los proyectos encomendados con mucho empeño, mistica de trabajo, responsabilidad y espiritu de logro. Recomendado."\n    }, {\n        "name": "Jesús Alejandro Sánchez Dávila",\n        "reference": "Excelente desarrollador.  Con buena disposición para el trabajo en grupo!"\n    }, {\n        "name": "Carlos Ochoa",\n        "reference": "Excelente persona, dedicado, aplicado, responsable, excelente desarrollador"\n    }, {\n        "name": "Williams Lameda",\n        "reference": "Raul es buen compañero, dispuesto a ayudar a otros."\n    }, {\n        "name": "Yeignalit Ramírez",\n        "reference": "Raúl es una persona responsable, siempre dispuesto a colaborar en lo que se necesite, es proactivo y se preocupa por hacer las cosas con el más mínimo detalle. Ha demostrado que su capacidad de aprendizaje es constante, y se siente atraído por cada nueva herramienta de desarrollo que hay en el mercado, no parará hasta dominarla."\n    }, {\n        "name": "Arsenio Perez",\n        "reference": "Raul es un excelente profesional en el area de la ingeniería en informática. Los trabajos encomendados sobre la Ingeniería de Software cuando estuvo prestando los servicios para la Dirección de Educación a Distancia de la Universidad Centroccidental Lisandro Alvarado, fueron ejecutados con mucha mística, responsabilidad y profesionalidad. Recomendado."\n    }]\n}',
    from: {
      email: 'rpino@tristan.com',
      name: 'Raul Pino',
      id: 2,
      picture: 'api/users/2/picture'
    },
    endpoint: '/api/endpoints/2/curriculum/linkedin.json'
  }
];
