/* BUILD NAV WITH JS object.......................*/
console.debug('NAV ITEMS LOADED.....');


/*
Occupations:

Lawn and Garden Care
Concrete/Masonry Pro
General Contractor
Plumber
Deck Builder
Painter
Carpenter
House Cleaner
Handyman
Electrician
Landscaper

*/

var data = {
    services: [{
        name: 'Categories',
        link: 'categories',
        sub: [



// Lawn and Garden Care
            {
                name: 'Lawn and Garden Care',
                link: 'lawn-and-garden-care',
                sub: [{
                        name: 'Artificial Turf Install',
                        link: 'artificial-turf-install',
                        sub: null
                    }]

                }, 

// CONCRETE & MASONRY

            {
                name: 'Concrete / Masonry Pro',
                link: 'concrete-masonry-pro',
                sub: [{
                    name: 'Brick & Block',
                    link: 'brick-block',
                    sub: null
                    }]
                },


// General Contracting

            {
                name: 'General Contractor',
                link: 'general-contractor',
                sub: [{
                        name: 'Barn and Shed Repair',
                        link: 'barn-shed-repair',
                        sub: null
                    },{
                        name: 'Deck Build',
                        link: 'Deck Build',
                        sub: null
                    },{
                        name: 'Driveway Installation',
                        link: 'Driveway Installation',
                        sub: null
                    },{
                        name: 'Driveway Repair',
                        link: 'Driveway Repair',
                        sub: null
                    },{
                        name: 'Drywall Installation',
                        link: 'Drywall Installation',
                        sub: null
                    },{
                        name: 'Exterior Awning Installation',
                        link: 'Exterior Awning Installation',
                        sub: null
                    },{
                        name: 'Exterior Shutter Installation',
                        link: 'Exterior Shutter Installation',
                        sub: null
                    },{
                        name: 'Flooring Installation',
                        link: 'Flooring Installation',
                        sub: null
                    },{
                        name: 'Foundation Repair',
                        link: 'Foundation Repair',
                        sub: null
                    },{
                        name: 'Framing Repair',
                        link: 'Framing Repair',
                        sub: null
                    },{
                        name: 'Gas Fireplace Installation',
                        link: 'Gas Fireplace Installation',
                        sub: null
                    },{
                        name: 'Hardscape',
                        link: 'Hardscape',
                        sub: null
                    },{
                        name: 'Pour Concrete',
                        link: 'Pour Concrete',
                        sub: null
                    },{
                        name: 'Security Bar Installation',
                        link: 'Security Bar Installation',
                        sub: null
                    },{
                        name: 'Shower Installation',
                        link: 'Shower Installation',
                        sub: null
                    },{
                        name: 'Stairway Build',
                        link: 'Stairway Build',
                        sub: null
                    },{
                        name: 'Stucco Installation',
                        link: 'Stucco Installation',
                        sub: null
                    },{
                        name: 'Stucco Repair',
                        link: 'Stucco Repair',
                        sub: null
                    },{
                        name: 'Subfloor Leveling',
                        link: 'Subfloor Leveling',
                        sub: null
                    }]
            },

                 // DECK BUILDER

            {
                name: 'Deck Builder',
                link: 'deck-builder',
                sub: [{
                        name: 'Deck Repair',
                        link: 'deck-repair',
                        sub: null
                    }]
            },


            // PAINTER


            {
                name: 'Painter',
                link: 'painter',
                sub: [{
                        name: 'Interior Painting',
                        link: 'interior-painting',
                        sub: null
                    }]
            },
            // CARPENTER

            {
                name: 'Carpenter',
                link: 'carpenter',
                sub: [{
                        name: 'Wood Stair Repair',
                        link: 'wood-stair-repair',
                        sub: null
                    }]
            },
            // HOUSE CLEANER

            {
                name: 'House Cleaner',
                link: 'house-cleaner',
                sub: [{
                        name: 'Whole House Cleaning',
                        link: 'whole-house-cleaning',
                        sub: null
                    }]
            },
            // HANDYMAN
            {
                name: 'Handyman',
                link: 'handyman',
                sub: [{
                        name: 'Interior Door Repair',
                        link: 'interior-door-repair',
                        sub: null
                    }]
            },
            // ELECTRICIAN
            {
                name: 'Electrician',
                link: 'electrician',
                sub: [{
                        name: 'Outlet Repair',
                        link: 'outlet-repair',
                        sub: null
                    }]
            },
            // LANDSCAPER
            {
                name: 'Landscaper',
                link: 'landscaper',
                sub: [{
                        name: 'Tree Trimming',
                        link: 'tree-trimming',
                        sub: null
                    }]
            }

        ] // categories

    }] // services

}; // data

