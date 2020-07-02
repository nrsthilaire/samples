let pro = {};

pro.liability = false;

pro.ownerName = {
  first,
  middle,
  last,
  fullname,
};

pro.setFullName = function (first, last, middle) {
  this.fullname = first + ' ' + middle + ' ' + last;
};

pro.businessName = '';
pro.dba = '';

pro.address = {
  Street,
  City,
  State,
  Zip
};

pro.businessphone = '';
pro.mobile = '';
pro.email = '';

pro.coverage = {
  zip,
  radius,
};

pro.occupations = [ // Array of objects
  {
    occupation,
    state,
    license,
    licensenumber,
  }, {
    occupation,
    state,
    license,
    licensenumber,
  }, {
    occupation,
    state,
    license,
    licensenumber,
  },
];

pro.addOccupation = function (occ, state, license, num) {
  this.occupations.push({
    occupation: occ,
    state: state,
    license: license,
    licensenumber: num
  });
}

pro.proxtra = '';