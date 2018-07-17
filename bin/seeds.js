const mongoose = require('mongoose');
const Activity = require('../models/activity') //importing the model for blueprints

const dbName = 'attract-athletic' //connecting to DB (make sure the name corresponds w/one in app.js)
mongoose.connect(`mongodb://localhost/${dbName}`);

const activityArr = [
    { name: "Indoor Rock Climbing",
    description: "Climbing is fun physical and mental workout that uses lots of muscle groups, not just upper body. Your back, abdominal and leg muscles all get exercised as well as your grip, shoulders and arms.",
    about: "The modern artificial wall climbing began in the UK. The first wall was created in 1964 by Don Robinson, a lecturer in Physical Education at the University of Leeds, by inserting pieces of rock into a corridor wall. Indoor climbing is an increasingly popular form of rock climbing performed on artificial structures that attempt to mimic the experience of outdoor rock. Indoor and outdoor climbing can differ in techniques, style and equipment. Climbing artificial walls, especially indoors, is much safer because anchor points and holds are able to be more firmly fixed, and environmental conditions can be controlled. During indoor climbing, holds are easily visible in contrast with natural walls where finding a good hold or foothold may be a challenge. Climbers on artificial walls are somewhat restricted to the holds prepared by the route setter whereas on natural walls they can use every slope or crack in the surface of the wall. ",
    image: [],
    funFact: "Most common climbing injury isn't related to falls, improper technique or bad equipment. The most common injury is Climber's Finger (damaged Flex or Tendon Pulley due to overuse) a.k.a. too much climbing.",
    },
    { name: "Indoor Archery Shooting",
    description: "Indoor archery is beginner friendly and is an easy way to ease into competitive archery. Targets for indoor archery are shot at 20 yards, and you don’t need special equipment to compete.",
    about: "Target archery is the most recognizable format of modern archery. It takes place both outdoors and indoors, over distances of up to 90 meters and using the traditional five-color, 10-ring target. International target archery includes two bowstyles: recurve and compound. Athletes of both bowstyles shoot at a traditional yellow, red, blue, black and white target that scores 10 for the inner ring and one for the outdoor ring.",
    image: [],
    funFact: "Archery is an ancient art that can be traced back centuries. Bows and arrows were the weapons of choice for the Babylonians in 2340BC but, thanks to the excavation of arrowheads in Africa, it’s believed that the practice dates back over 25,000 years.",
    },
    { name: "Dodgeball",
    description: "A great form of anaerobic exercise that increases agility and balance, improves strength training, hand-eye coordination and flexibility, develops fast reflexes, builds teamwork and relieves stress.",
    about: "The main objective of each team is to eliminate all members of the opposing team by hitting them with thrown balls, catching a ball thrown by a member of the opposing team, or forcing them to move outside the court boundaries when a ball is thrown at them. Playing dodgeball on a trampoline surface with trampoline-lined edges of the playing field provide added workout and health benefits. The additional bouncing and effort required to move rapidly and explosively on a trampoline surface improves the exercise benefits for the muscles as well as heart and lungs.",
    image: [],
    funFact: "Dodgeball was first played in Africa over 200 years ago. Instead of soft balls, players threw rocks and putrified matter at the opposing team, while also defending their own teammates who were under attack. The exercise was meant to encourage team-work for when the players went into battle with other tribes.",
    },
    { name: "Kayaking",
    description: "There are few better ways to spend a couple hours or a full day for that matter, than in a kayak moving over water. Think portable fun with which you can explore a favorite or soon to be favorite spot.",
    about: "A kayak is a low-to-the-water, canoe-like boat in which the paddler sits facing forward, legs in front, using a double-bladed paddle to pull front-to-back on one side and then the other in rotation.",
    image: [],
    funFact: "The name “Kayak” means “hunter’s boat” as kayaks were originally invented by the Inuit, Yup’Ik, and the Aleut for hunting. They were made of seal or other animal skin stretched over wood or whale bone. Kayaks are very quiet which made them ideal for sneaking up on prey.",
    },
    { name: "Basketball",
    description: "Playing basketball in a non-coached, non-refereed setting. The group is open to all skill levels, genders, and ages.",
    about: "Basketball, game played between two teams of five players each on a rectangular court, usually indoors. Each team tries to score by tossing the ball through the opponent’s goal, an elevated horizontal hoop and net called a basket.",
    image: [],
    funFact: "The only major sport strictly of U.S. origin. Early basketball hoops were nailed to the mezzanine balcony of the court. After spectators in the balcony continually interfered with shots, the backboard was invented.",
    },
];

Activity.create(activityArr)
    .then((result)=>{
        console.log(`created ${result.length} activities`);
        result.forEach(oneActivity => {
            console.log('In DB ', oneActivity.name)
        })
        mongoose.disconnect();
            
        })
    .catch((err)=>{
            console.log('Error creating activity collection', err)
        })