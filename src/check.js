const { validate } = require("./index");
const { logger } = require("./logger");
const emails = [
  // "reyad@imssystems.tech",
  // "dev.reyadhossain@gmail.com",
  // "ahmed.khan@northsouth.edu",
  // "woyava3903@camplvad.com",
  // "samin@imssystems.tech",
  // "muhib@automationsolutionz.com"
  // "adam@applocum.com"
  // 'rafee@imssystems.tech',
  // 'nuraz.zamal@imssystems.tech',
  // 'nurazzamal@outlook.com',
  // 'nurul@imssystems.tech',
  // 'zain@imssystems.tech',
  // 'kamalqazi@gmail.com',
  // 'mohammedalihussain@gmail.com',
  'pias@imssystems.tech',
  // 'harveymichelle1@gmail.com',
  // 'hello@kamalrob.com',
  // 'mrkamalhussain@hotmail.com',
  // 'pagclifford@gmail.com',
  // 'graham.hetherington@gmail.com',
  // 'kashif@ashraf.co.uk',
  // 'lizzi@ahs-heating.co.uk',
  // 'nick.belltye@element.com',
  // 'shuvo1817034@stud.kuet.ac.bd',
  // 'lubes77@gmail.com',
  // 'dan@knightsdigital.org',
  // 'gary.nel@gnsurveys.co.uk',
  // 'gareth@alterego-lingerie.com',
  // 'diane@alterego-lingerie.com',
  // 'shuxeb@hotmail.com',
  // 'dominic.talbot@gnsurveys.co.uk',
  // 'test123@yopmail.com',
  // 'carlr_coll@hotmail.com',
  // 'singh@duckhams.co.uk',
  // 'andrew.hunt@oldham.gov.uk',
  // 'manager@oghcsrc.uk',
  // 'andrew@foycertification.com',
  // 'clairemcgeechan@ceeppt.co.uk',
  // 'iomerji@hotmail.com',
  // 'rod@glqssaftercare.com',
  // 'rod@glassaftercare.com',
  // 'danyal0807@gmail.com',
  // 'anneke.muller@gnsurveys.co.uk'
  // "dev.mehrabhossain@gmail.com"
];

emails.map(async (email) => {
  try {
    const validationResult = await validate(email);
    logger.info(email + " : ", validationResult);
  } catch (err) {
    logger.error(err.message, { stack: err.stack });
    logger.debug(err.message, { stack: err.stack });
  }
});
