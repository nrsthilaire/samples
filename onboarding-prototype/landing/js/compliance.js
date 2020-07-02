console.log('compliance.js loaded');

var requirements = [
  {
    STATE: 'AK',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Electrical Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Specialty Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Electrical Administrator License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Administrator is also accepted.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Residential Plumbing and Hydronic Heating (RPHH) License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Painting Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'General Contractor – Handyman License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Handymen License is the minimum requirement.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'General Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Landscaping Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Carpentry Contractor,Rough License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Carpentry Contractor,Finish License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Carpentry Contractor,Rough License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Concrete and Paving Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AK',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Specialty Mansory Contractor License',
    VALIDATION: 'https://www.commerce.alaska.gov/cbp/Main/CBPLSearch.aspx?mode=Prof',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://www.aecb.state.al.us/licensee.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://www.pgfb.state.al.us/inquiry.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://alhob.glsuite.us/GLSuiteweb/clients/alhob/public/LicenseeSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://alhob.glsuite.us/GLSuiteweb/clients/alhob/public/LicenseeSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://alhob.glsuite.us/GLSuiteweb/clients/alhob/public/LicenseeSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.ark.org/labor/electrician/search.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://adhplumbinghvacrlookup.arkansas.gov/ProtectiveHealthCodesLicensees/Show-ProtectiveHealthCodesLicensees-Table.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Painting, Wallcovering (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Painting, Wall Covering (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Carpentry, Framing, Milwork, Cabinet (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Carpentry, Framing, Milwork, Cabinet (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Concrete (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Concretet & Masonry (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Masonry (Specialty Classification)',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Concretet & Masonry (Specialty Classification) is the minimum requirement.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Remodeler is also acceptable.'
  },
  {
    STATE: 'AR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://aclb2.arkansas.gov/clbsearch.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'CR-11-Electrical Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CR-11 Electrical Contractor License is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'CR-37 Plumbing Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'CR-34 Painter and Wall Covering License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'R-62-Minor Home Improvements',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. R-62 is the minimum license required.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-3-General Remodeling and Repair Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-3 License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-1 Dual Building Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-1 Dual Building Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-2 Dual Residential Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-2 Dual Residential Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B License is the minimum license required.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-3-General Remodeling and Repair Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-3 License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-1 Dual Building Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-1 Dual Building Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'KB-2 Dual Residential Contractor',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. KB-2 Dual Residential Contractor is also accepted.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'CR-21 Landscaping and Irrigation/ Fencing License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Landscaper',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'CR-61 Carpentry Remodeling and Repairs',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CR-7 Carpentry',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'CR-63 Appliance License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'CR-31 Mansory',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'R-09 Concrete',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'AZ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B- General Residential Contractor License',
    VALIDATION: 'https://roc.az.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'C-10 Electrical Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'C-36 Plumbing Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'C-33 Painting and Decorating Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'C-27 Landscaping Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-5 Framing and Rough Carpentry License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-5 Framing and Rough Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-6 Cabinet , Milwork and Finish Carpentry License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-6 Cabinet, Milwork and Finish Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'California Major Appliance Repair License',
    VALIDATION: 'http://www2.dca.ca.gov/pls/wllpub/wllqryna$lcev2.startup?p_qte_code=SRD&p_qte_pgm_code=3900',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'D-41 Siding and Decking Contractors License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-29 Masonry License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-29 Mansonry License is the minimum requirement.'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-8 Concrete Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-8 Concrete License is the minimum requirement'
  },
  {
    STATE: 'CA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor License',
    VALIDATION: 'https://www2.cslb.ca.gov/OnlineServices/CheckLicenseII/CheckLicense.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-License is also accepted'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CO',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://apps.colorado.gov/dora/licensing/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'E-1 Unlimited Electrical Contractor License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. E-1 Unlimited Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'P-1 Unlimited Plumbing Contractor License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. P-1 Unlimited Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'E-1 Unlimited Electrical Contractor License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. E-1 Unlimited Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'E-2 Unlimited Journeyman Electrician License',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. E-2 Unlimited Journeyman Electrician License is also accepted.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'CT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.elicense.ct.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://www.asisvcs.com/services/licensing/DCOPLA/search_page.asp?CPCAT=3609STATEREG',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Refrigeration/AC Limited',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Refrigeration/AC Limited License is the minimum requirement.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DC',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://eservices.dcra.dc.gov/BBLV/Default.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'MSE-Master Special Electrician License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Special Electrician License is also accepted.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://dpronline.delaware.gov/mylicense weblookup/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'DE',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'BL-Business License',
    VALIDATION: 'http://revenue.delaware.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Certified Electrical License',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Certified Plumbing License',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Certified General Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified General Contractor License is the minimum requirment.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Residential Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Residential Contractor License is also accepted.'
  },
  {
    STATE: 'FL',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Certified Building Contractor',
    VALIDATION: 'https://www.myfloridalicense.com/wl11.asp?mode=0&SID=&brd=&typ=N',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Certified Building Contracor License is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License Non Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor Non Restricted is the minimum requirement.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Electrical Contractor License Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor Restricted is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License Non-Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License Non Restricted is the minimum requirement.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License Restricted',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License Restricted is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Basic',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Basic License is the minimum requirement. The following are acceptable Residential Basic Licenses:(RBI) Residential Basic Individual, (RBQA) Residential Basic Qualifying Agent, and (RBCO)Residential Basic Company.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Light',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential/Light Commercial License is also accepted. The following are acceptable Residential Light Licenses: (RLCI) Residential Light Commercial Individual and (RLQA) Residential Light Qualifying Agent.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. General Contractor License is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Basic',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Basic License is the minimum requirement. The following are acceptable Residential Basic Licenses:(RBI) Residential Basic Individual, (RBQA) Residential Basic Qualifying Agent, and (RBCO)Residential Basic Company.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Light',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential/Light Commercial License is also accepted. The following are acceptable Residential Light Licenses: (RLCI) Residential Light Commercial Individual and (RLQA) Residential Light Qualifying Agent.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. General Contractor License is also accepted.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Basic',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Basic License is the minimum requirement. The following are acceptable Residential Basic Licenses:(RBI) Residential Basic Individual, (RBQA) Residential Basic Qualifying Agent, and (RBCO)Residential Basic Company.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Light',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential/Light Commercial License is also accepted. The following are acceptable Residential Light Licenses: (RLCI) Residential Light Commercial Individual and (RLQA) Residential Light Qualifying Agent.'
  },
  {
    STATE: 'GA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'General Contractor',
    VALIDATION: 'http://verify.sos.ga.gov/Verification/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. General Contractor License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'C-13 Electrical Contractor License',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'C-37 Plumbing Contractor License',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'C-33 Painting and Decorating Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'C-27 Landscaping Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Landscaper',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-6 Carpentry Framing Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-6 Framing and Rough Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-5 Cabinet,Milwork, and Carpentry Remodeling and Repairs',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-5 Cabinet, Milwork and Finish Carpentry License is the minimum requirement.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-31 Masonry Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-31- Masonry Contractor License is the minimum requirement .'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'C-31a Cement Concrete Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. C-31a- Cement Concrete Contractor License is the minimum requirement.'
  },
  {
    STATE: 'HI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'B General Building Contractor',
    VALIDATION: 'https://pvl.ehawaii.gov/pvlsearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://contractor.iowa.gov/IowaIWD/CREG/publicSearch/publicSearch.jsp?lid=&eaaUserId=',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://web.dbs.idaho.gov/etrakit3/Custom/Idaho_LicenseSearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Registered Individual Contractor (RCT)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Individual Contractor (RCT) is the minimum requirement.'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registered Entity Contractor (RCE)',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Registered Entity Contractor (RCE) is also acceptable'
  },
  {
    STATE: 'ID',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'General Remodel Contractor License',
    VALIDATION: 'https://secure.ibol.idaho.gov/eIBOLPublic/LPRBrowser.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IL',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://plumblicv5pub.dph.illinois.gov/Clients/ILDOHPlumb/Public/Verification/Plumber_License_Verification.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'IN',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://mylicense.in.gov/everification/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'KY',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://ky.joportal.com/License/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Work (StateWide)',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Must have \'Electrical Work (StateWide)\' classification.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumbing License',
    VALIDATION: 'http://www.spbla.com/rosters-v3/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. \'Master Plumber License\' must be from the State Plumbing Board of Louisiana.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor Registration is the minimum requirement.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential License',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Contactor License is also acceptable'
  },
  {
    STATE: 'LA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor Registration is the minimum requirement.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential License',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Contactor License is also acceptable'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'LA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Building Construction License',
    VALIDATION: 'http://www.lslbc.louisiana.gov/contractor-search/search-contractor-license-number/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://elicensing.state.ma.us/CitizenAccess/GeneralProperty/PropertyLookUp.aspx?isLicensee=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://elicensing.state.ma.us/CitizenAccess/_SearchaLicense.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://services.oca.state.ma.us/hic/licenseelist.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_Search/OP_search.cgi?calling_app=ME::ME_registration_num',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=PLM::PLM_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MD',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://www.dllr.state.md.us/cgi-bin/ElectronicLicensing/OP_search/OP_search.cgi?calling_app=HIC::HIC_qselect',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ME',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.pfr.maine.gov/almsonline/almsquery/welcome.aspx?board=4220',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'ME',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://www.pfr.maine.gov/almsonline/almsquery/welcome.aspx?board=4220',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Special Electrician License is also accepted.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://aca3.accela.com/lara/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://aca3.accela.com/lara/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (J-Painting & Decorating)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (J-Painting & Decorating) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (A-Carpentry)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (A-Carpentry) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (I-Masonry)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (I-Masonry) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Maintenance & Alteration License (B-Concrete)',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Maintenance & Alteration (B-Concrete) classification is the minimum requirement.'
  },
  {
    STATE: 'MI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder License',
    VALIDATION: 'https://www.lara.michigan.gov/colaLicVerify/lSearch.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Builder is also acceptable.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master (A) Electrician',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Building Contractor',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Building Contractor',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MN',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Residential Building Contractor',
    VALIDATION: 'https://secure.doli.state.mn.us/lookup/licensing.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Residential Remodeler',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MS',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Builder',
    VALIDATION: 'http://www.msboc.us/ConsolidatedSearch.CFM',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'MT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor',
    VALIDATION: 'http://erd.dli.mt.gov/work-comp-regulations/montana-contractor/construction-contractor-search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://arls-public.ncbeec.org/Public/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'PU(Electrical-Ahead of P.O.D)',
    VALIDATION: 'https://arls-public.ncbeec.org/Public/Search',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. PU(Electrical-Ahead of P.O.D) is also acceptable.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://onlineweb.nclicensing.org/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Plumbing Class I License',
    VALIDATION: 'https://onlineweb.nclicensing.org/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Class I License is also accepted.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Plumbing Class II License',
    VALIDATION: 'https://onlineweb.nclicensing.org/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Class II License is also accepted.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Residential Contractor License',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Building Contractor License',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.Building Contractor License is also accepted.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Residential Contractor',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Building Contractor',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NC',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Building Contractor License',
    VALIDATION: 'http://www.nclbgc.org/lic_fr.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.ndseb.com/index.php?id=70',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'ND',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractor License',
    VALIDATION: 'https://apps.nd.gov/sc/busnsrch/busnSearch.htm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://www.nebraska.gov/sed/search/index.cgi',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'A Master Electrician License',
    VALIDATION: 'http://www.nebraska.gov/sed/search/index.cgi',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. A Master Electrician License is also accepted.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B Master Electrician License',
    VALIDATION: 'http://www.nebraska.gov/sed/search/index.cgi',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B Master Electrician License is also accepted.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NE',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractor Registration',
    VALIDATION: 'https://dol.nebraska.gov/conreg/SearchContractors/SearchContractors',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NH',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrical License',
    VALIDATION: 'https://nhlicenses.nh.gov/verification/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'NH',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://nhlicenses.nh.gov/verification/Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NJ',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'https://newjersey.mylicense.com/verification_4_6/Search.aspx?facility=Y',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-98 is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB-2-Residential Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-2 is also accepted.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-98 is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB-2-Residential Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-2 is also accepted.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GB-98 is also accepted.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'GS-29-Fixtures,cabinet and milwork',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GS 29 is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'GB 98- General Building',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'GS-16- Mansory',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GS-16 license is the minimum requirement.'
  },
  {
    STATE: 'NM',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'GS-4-Concrete, cement, walkwayss and driveways',
    VALIDATION: 'https://public.psiexams.com/search.jsp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.GS-4 license is the minimum requirement.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'C-2 Electrical Contracting License',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'C-1 Plumbing and Heating License',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'C-4 Painting and Decorating',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'C-10 Landscaping Contracting',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'C-3 Carpentry, Maintenance and Mirrors Repair',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'NV',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'https://www.nvcontractorsboard.com/datamart/nvscbSearchByLicNumber.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OH',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OH',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OH',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Refrigeration Contractor License',
    VALIDATION: 'https://elicense4.com.ohio.gov/Lookup/LicenseLookup.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'OK',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://cibverify.ok.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'OK',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor',
    VALIDATION: 'http://cibverify.ok.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Must have both, (Building Codes Division) License and CCB License Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Must have both, (Building Codes Division) License and CCB License Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor. Must have Lead-Based Paint Renovation License(LBPR).'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'OR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'CCB License (Residential General Contractor)',
    VALIDATION: 'http://search.ccb.state.or.us/search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Endorsement type must be: Residential General Contractor.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement Contractor Registration',
    VALIDATION: 'http://hicsearch.attorneygeneral.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Perito Electricista',
    VALIDATION: 'https://pr.pcshq.com/lookup/en/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Maestro Plomero',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Pintura',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Carpintería',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'PR',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Registro de Contratista: Construcción General',
    VALIDATION: 'http://daco.pr.gov/reports/viewrepreg.asp',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Contractors License(Residential)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Contractor License is the minimum requirement.'
  },
  {
    STATE: 'RI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Contractors License(Commercial)',
    VALIDATION: 'http://www.crb.ri.gov/verify_CRB.php',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Commercial Contractor License is also accepted.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Painters/Wall Paper Hange Specialty License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Carpenters Specialty License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Mason Specialty Contractor Liense',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SC',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Home Builders License',
    VALIDATION: 'https://verify.llronline.com/LicLookup/Resbu/Resbu.aspx?div=46&AspxAutoDetectCookieSupport=1',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'SD',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'Call 605-773-3573 for Electrical License Verification',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is the minimum requirement.'
  },
  {
    STATE: 'SD',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'Call 605-773-3429 for Plumbers License Verification',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contracting License (CE)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contracting License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Licensed Electrician License (LLE)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Licensed Electrician is also accepted'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Limited Licensed Plumber License (LLP)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Licensed Plumber is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Plumbing and Gas Piping License (CMC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Plumbing and Gas Piping License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Home Improvement License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Home Improvement Contractor License is the minimum requirement.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Residential Building Construction License (BC-A)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Building Construction License is also accepted.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Limited Residential Construction License (BC-A/r)',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Limited Residential Construction License is also acceptd.'
  },
  {
    STATE: 'TN',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Building Construction Contractor License',
    VALIDATION: 'http://verify.tn.gov/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contracting License is the minimum requirement'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://vo.licensing.hpc.texas.gov/datamart/selSearchType.do',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'RAIC - Residential Appliance Installation Contractor License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RAIC License is the minimum requirement.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'RAI - Residential Appliance Installer',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Residential Appliance installer license is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Home Irrigation Pro',
    REQUIRED: 'YES',
    LICENSE: 'Landscape Irrigator License',
    VALIDATION: 'http://www2.tceq.texas.gov/lic_dpa/index.cfm',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Low Voltage Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contracting License is the minimum requirement'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Low Voltage Pro',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://www.tdlr.texas.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Security System Pro',
    REQUIRED: 'YES',
    LICENSE: 'Alarms System Installer License',
    VALIDATION: 'https://tops.portal.texas.gov/psp-self-service/search/index',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Local Movers',
    REQUIRED: 'YES',
    LICENSE: 'Household Goods Carrier License',
    VALIDATION: 'https://apps.txdmv.gov/apps/mccs/truckstop/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Locksmith',
    REQUIRED: 'YES',
    LICENSE: 'Locksmith License',
    VALIDATION: 'https://tops.portal.texas.gov/psp-self-service/search/index',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Pest Control Pro',
    REQUIRED: 'YES',
    LICENSE: 'Structural Pest Control License',
    VALIDATION: 'http://texasagriculture.gov/regulatoryprograms/structuralpestcontrolservice/pestcontrolbusinesslicenseewebsearch.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'TX',
    VERTICAL: 'Home Inspector',
    REQUIRED: 'YES',
    LICENSE: 'Professional Real Estate Inspector License',
    VALIDATION: 'https://www.trec.texas.gov/apps/license-holder-search/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'S-200 General Electrical Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-200 License is the minimum requirement.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'S-201 Residential Electrical Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-201 is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'S-210 General Plumbing Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html;jsessionid=c7156693f364c163512d846b0741',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-210 License is the minimum requirement.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'S-217 Residential Plumbing Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html;jsessionid=c7156693f364c163512d846b0741',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. S-217 is also acceptable'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'S-300 General Painting Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Handyman Exemption Registration',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Handyman Excemption is the required minimum.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'R100 Residential and Small Commercial',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B100 General Building Contractor is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B100 General Building Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. R100 Residential and Small Commercial is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'R100 Residential and Small Commercial',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. R100 Residential and Small Commercial is the required minimum'
  },
  {
    STATE: 'UT',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B100 General Building Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B100 General Building Contractor is also acceptable.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'S-330 Landscaping Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'S-220 Carpentry Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'B100 General Building Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'S-290 General Masonry Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'UT',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'S-261 Concrete Form Setting and Shoring Contractor',
    VALIDATION: 'https://secure.utah.gov/llv/search/index.html',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Plumber',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is also accepted.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'PTC- Painting and wallcovering contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. PTC License is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CBC-Commercial Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'HIC-Home Improvement Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. HIC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CIC-Commmercial Improvement Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CIC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'HIC-Home Improvement License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. HIC is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. RBC License is the minimum requirement.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CBC-Commercial Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. CBC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'HIC-Home Improvement License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. HIC License is also acceptable.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'LSC-Landscape Service Contracting',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'ISC- Landscape Irrigation Contracting',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'HIC-Home Improvement License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'RBC-Residential Building License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'CBC-Commercial Building Contracting License',
    VALIDATION: 'http://www.dpor.virginia.gov/LicenseLookup/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VT',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'http://firesafety.vermont.gov/building_trades',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'VT',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Plumbing Contractor License',
    VALIDATION: 'http://firesafety.vermont.gov/building_trades',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Plumbing Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Plumbing) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Painting and Wall Covering Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Painting and Wall Covering Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Handyman)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Handyman Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Handyman',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Landscaping Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Landscaping Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Landscaper',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Cabinets, Milwork and Finish Carpentry)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Cabinets, Milwork and Finish Carpentry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Framing and Rough Carpentry Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Framing and Rough Carpentry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Appliances Equipment Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Appliances Equipment Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Appliance Professional',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Framing and Rough Carpentry Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Framing and Rough Carpentry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Concrete Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Concrete Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Construction Contractor License (Masonry Specialty)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (Masonry Specialty) is the minimum requirement.'
  },
  {
    STATE: 'WA',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Construction Contractor License (General)',
    VALIDATION: 'https://secure.lni.wa.gov/verify/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Construction Contractor License (General) covers ALL 63 scopes of work.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is the minimum requirement.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Plumber License is the minimum requirement.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WI',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'Dwelling Contractor License',
    VALIDATION: 'https://app.wi.gov/LicenseSearch/',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Plumber',
    REQUIRED: 'YES',
    LICENSE: 'Master Plumber License',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Painter',
    REQUIRED: 'YES',
    LICENSE: '015-Painting License',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. 015-Painting License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Painter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Handyman',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'General Contractor',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'General Contractor',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Landscaper',
    REQUIRED: 'YES',
    LICENSE: 'Landscaping License-003',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. 003-License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Carpenter',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Carpenter',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'YES',
    LICENSE: '083-Decks',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. 083 license is the minimum requirement.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. B-General Building License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Deck Builder',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'H-Residential',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. H-Residential License is also accepted.'
  },
  {
    STATE: 'WV',
    VERTICAL: 'Concrete/Masonry Pro',
    REQUIRED: 'YES',
    LICENSE: 'B-General Building',
    VALIDATION: 'http://labor.wv.gov/Pages/Contractor-Search.aspx',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN.'
  },
  {
    STATE: 'WY',
    VERTICAL: 'Electrician',
    REQUIRED: 'YES',
    LICENSE: 'Electrical Contractor License',
    VALIDATION: 'Call the Electrical Safety Division at 307-777-7288, or email Lynette Paxton (lynette.paxton@wyo.gov) or Lynn Devilbiss (lynn.devilbiss@wyo.gov).',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Electrical Contractor License is the minimum requirement.'
  },
  {
    STATE: 'WY',
    VERTICAL: 'Electrician',
    REQUIRED: 'ACCEPTABLE',
    LICENSE: 'Master Electrician License',
    VALIDATION: 'Call the Electrical Safety Division at 307-777-7288, or email Lynette Paxton (lynette.paxton@wyo.gov) or Lynn Devilbiss (lynn.devilbiss@wyo.gov).',
    DESCRIPTION: 'Your name must match exactly as it appears on your proof of EIN. Master Electrician License is also accepted.'
  }
];


var found_reqs = j$.grep(requirements, function(v) {
    return v.STATE === "WY" && v.VERTICAL === "Electrican";
});

console.log(found_reqs);





