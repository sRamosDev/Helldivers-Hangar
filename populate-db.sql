INSERT INTO public.passive
VALUES (1, 'Advanced Filtration', 'Provides 80% resistance to gas damage and effects.');
INSERT INTO public.passive
VALUES (2, 'Med-Kit', 'Increases initial inventory and holding capacity of stims by +2.
 Increases stim effect duration by 2.0s.');
INSERT INTO public.passive
VALUES (3, 'Scout', 'Markers placed on the map will generate radar scans every 2.0s.
 Reduces range at which enemies can detect the wearer by 30%.');
INSERT INTO public.passive
VALUES (4, 'Standard Issue', 'No additional bonuses.');
INSERT INTO public.passive
VALUES (5, 'Peak Physique', 'Increased Melee Damage by 50%.
 Improves weapons handling with less drag on the weapon movement.');
INSERT INTO public.passive
VALUES (6, 'Servo-Assisted', 'Increases throwing range by 30%.
 Provides +50% limb health.');
INSERT INTO public.passive
VALUES (7, 'Extra Padding', 'Provides a higher armor rating.');
INSERT INTO public.passive
VALUES (8, 'Engineering Kit', 'Further Reduces recoil when crouching or prone by 30%.
 Increases initial inventory and holding capacity of grenades by +2.');
INSERT INTO public.passive
VALUES (9, 'Democracy Protects', '50% chance to not die when taking lethal damage.
 Prevents all damage from bleeding if chest hemorrhages.');
INSERT INTO public.passive
VALUES (10, 'Inflammable',
        'Provides 75% damage resistance to fire, allowing bearer to rest assured in the inflammability.');
INSERT INTO public.passive
VALUES (11, 'Fortified', 'Further reduces recoil when crouching or prone by 30%.
 Provides 50% resistance to explosive damage.');
INSERT INTO public.passive
VALUES (12, 'Electrical Conduit', 'Provides 95% resistance to arc damage.');
INSERT INTO public.passive
VALUES (13, 'Unflinching', 'Helps prevent Helldivers from flinching when hit.');

INSERT INTO public.firing_mode
VALUES (1, 'Bolt-Action');
INSERT INTO public.firing_mode
VALUES (2, 'All Barrels');
INSERT INTO public.firing_mode
VALUES (3, 'Pump Action');
INSERT INTO public.firing_mode
VALUES (4, 'Automatic');
INSERT INTO public.firing_mode
VALUES (5, 'Semi Automatic');
INSERT INTO public.firing_mode
VALUES (6, 'Burst');
INSERT INTO public.firing_mode
VALUES (7, 'Charge With Safety On');

INSERT INTO public.trait
VALUES (1, 'Medium Armor Penetrating');
INSERT INTO public.trait
VALUES (2, 'Rounds Reload');
INSERT INTO public.trait
VALUES (3, 'Heavy Armor Penetrating');
INSERT INTO public.trait
VALUES (4, 'Beam');
INSERT INTO public.trait
VALUES (5, 'Explosive');
INSERT INTO public.trait
VALUES (6, 'Light Armor Penetrating');
INSERT INTO public.trait
VALUES (7, 'Chargeup');
INSERT INTO public.trait
VALUES (8, 'Incendiary');
INSERT INTO public.trait
VALUES (9, 'One Handed');
INSERT INTO public.trait
VALUES (10, 'Stimulative');
INSERT INTO public.trait
VALUES (11, 'Heat');

INSERT INTO public.armor
VALUES (1, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (2, 'B-08 Light Gunner',
        'Compact and flexible, this kevlar armor adds minimal mass, making it a common choice for Helldiver fitness tests.',
        'Medium', 100, 550, 125, NULL);
INSERT INTO public.armor
VALUES (3, 'B-24 Enforcer', 'In field tests, 84% of users said that the armor improved their posture and self-esteem.',
        'Medium', 100, 471, 71, NULL);
INSERT INTO public.armor
VALUES (4, 'B-27 Fortified Commando',
        'This armor set first appeared in the music video for the summer anthem ''Our Love is Like Liberty (Indestructible)''.',
        'Heavy', 200, 450, 50, NULL);
INSERT INTO public.armor
VALUES (5, 'CE-07 Demolition Specialist',
        'Originally worn by lunar terraformers, this suit can withstand rapid changes in pressure, heat, and personal velocity.',
        'Light', 64, 536, 118, NULL);
INSERT INTO public.armor
VALUES (6, 'CE-27 Ground Breaker',
        '''The ground is just another obstacle that hasn''t yet been cleared.'' - SGM Janet Jones, Excavation Corps Founder.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (7, 'CE-35 Trench Engineer',
        'After colonists of Hellmire recovered a lost shipment of this armor, the local pastime of fence-smashing was born.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (8, 'CE-64 Grenadier',
        'The set''s classic advertising campaign ''Have you tried a grenade?'' has remained unchanged for over 70 years',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (9, 'CE-67 Titan',
        'A quality product, this armor can destroy over 300,000 kilometers of fencing with no decline in operational efficiency.',
        'Light', 79, 521, 111, NULL);
INSERT INTO public.armor
VALUES (10, 'CE-74 Breaker',
        'A domestic version of this armor is available for citizens who wish to perform efficient home renovation projects.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (11, 'CE-81 Juggernaut',
        'One of the most durable engineer armors available, each set is quality tested by an impact with a full-grown Charger.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (12, 'CM-06 Combat Medic',
        'This armor was designed by PFC Rodney A. Carmichael, the first Helldiver to use a stim on an ally instead of himself.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (13, 'CM-09 Bonesnapper',
        'Based on a colonial surgeon''s gown, where surgeries were often interrupted by a need to perform defensive duties.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (28, 'EX-16 Prototype 16',
        'As the electric arc generates a strong magnetic field, wearers should avoid use while in the vicinity of stapled paperwork',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (29, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 450, 50, NULL);
INSERT INTO public.armor
VALUES (30, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (31, 'FS-11 Executioner',
        'Popularized by actor Chip Messiter, who wore this in the action-rom-com-musical ''Lost My Heart to a Man in a Helmet.''',
        'Medium', 100, 450, 50, NULL);
INSERT INTO public.armor
VALUES (32, 'FS-23 Battle Master',
        'This aim-stabilizing armor found surprising secondary market success among alien birdwatching enthusiasts.',
        'Medium', 100, 450, 50, NULL);
INSERT INTO public.armor
VALUES (33, 'FS-23 Battle Master',
        'This aim-stabilizing armor found surprising secondary market success among alien birdwatching enthusiasts.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (14, 'CM-10 Clinician',
        'Featuring patented reverse-seam technology, to reduce the likelihood of bodily fluids entering the armor''s interior.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (15, 'CM-14 Physician',
        'The distinctive red, white, and green of the Intergalactic Medical Corps signal to all Helldivers that help is at hand.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (16, 'CM-17 Butcher',
        'An armor often worn by frontline surgeons, who are skilled at both putting bodies back together and taking them apart.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (17, 'CM-21 Trench Paramedic',
        'The suit was once designed to hold a variety of battlefield medical equipment. Now it holds a generous supply of stims.',
        'Light', 64, 536, 118, NULL);
INSERT INTO public.armor
VALUES (18, 'CW-22 Kodiak',
        'The CW-22 Kodiak armor was thoroughly pressure-tested by patriotic volunteers, as part of the ''Test Subjects for Super-Earth'' Citizen Advancement Program.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (19, 'CW-36 Winter Warrior',
        'Offering camouflage in snowy environments, surplus sets of this armor are used by nature photographers and keen hunters alike.',
        'Medium', 100, 450, 50, NULL);
INSERT INTO public.armor
VALUES (20, 'CW-36 Winter Warrior',
        'Offering camouflage in snowy environments, surplus sets of this armor are used by nature photographers and keen hunters alike.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (21, 'CW-4 Arctic Ranger',
        'Features a utility belt with pockets that can be filled with any number of things, such as pocket knives, mementos from home, and interesting rocks.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (22, 'CW-9 White Wolf',
        'The pattern used for this armor is the result of the Winter Camouflage Improvement Effort, which considered 136 entrants before determining the color white would best blend in with snow.',
        'Heavy', 150, 500, 100, NULL);
INSERT INTO public.armor
VALUES (23, 'DP-11 Champion of the People',
        'The three stripes on the pauldrons stand for the three principles of Super Earth: Liberty, Democracy, and Prosperity.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (24, 'DP-40 Hero of the Federation',
        'Though originally intended solely for ceremonial use, its inspirational energy proved equally useful on the battlefield.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (25, 'DP-53 Savior of the Free',
        'A faithful replica of the armor worn at The Battle of Liberty Peak. Honor their legacy, and wear it with pride.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (26, 'EX-00 Prototype X',
        'The end result of several billion Super Credits and 12 years of research into creating “the Solider of Tomorrow”.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (27, 'EX-03 Prototype 3',
        'Because this prototype''s wires operate at 400,000 volts, it also includes a handy rubber underlayer for insulation.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (34, 'FS-34 Exterminator',
        'Features a patented non-stick coating, which makes scraping viscera off after a long day of battle less taxing.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (35, 'FS-37 Ravager',
        'Contains many small pockets, allowing the user to evenly distribute the weight of ammunition, samples, and cool rocks.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (36, 'FS-38 Eradicator',
        'First deployed in the mines of Cyberstan, where it offered protection against explosions in the hydrogen-rich caverns.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (37, 'FS-55 Devastator',
        'Contains many small pockets, allowing the user to evenly distribute the weight of ammunition, samples, and cool rocks.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (38, 'FS-61 Dreadnought',
        'With genuine gold accents, 74% of colonists voted this armor the set they would most like to be buried in.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (39, 'SA-04 Combat Technician',
        'Due to the enhanced strength caused by this armor, caution is advised when using door handles or embracing colleagues.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (40, 'SA-12 Servo Assisted',
        'Each servo-assisted limb contains 138 miniature motors, to support a natural gait and long-term spinal health.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (41, 'SA-12 Servo-Assisted',
        'Each servo-assisted limb contains 138 miniature motors, to support a natural gait and long-term spinal health.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (42, 'SA-25 Steel Trooper',
        'For optimal performance, the manufacturer recommends avoiding immersing this armor in salt water for prolonged periods.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (43, 'SA-32 Dynamo',
        'In mountainous colonies, domestic variants of this armor are used to throw weather monitoring equipment uphill.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (44, 'SC-15 Drone Master',
        'Some soldiers report picking up strange radio interference when wearing this armor near alien artifacts.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (45, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (46, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Light', 70, 530, 115, NULL);
INSERT INTO public.armor
VALUES (47, 'SC-37 Legionnaire',
        'This armor is based on the antique uniforms of the ''Super Earth Legion'', a less patriotic precursor to the Helldivers.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (48, 'TR-117 Alpha Commander',
        'For warriors who are so strong and confident that they don''t need any reassurance whatsoever.', 'Medium', 100,
        500, 100, NULL);
INSERT INTO public.armor
VALUES (49, 'TR-40 Gold Eagle',
        'This high-visibility armor allows it''s bearer to be easily seen through smoke, fog, and spewing viscera.',
        'Heavy', 150, 500, 100, NULL);
INSERT INTO public.armor
VALUES (50, 'TR-62 Knight', 'Crafted to deliver Justice to the darkest crevices of the galaxy.', 'Medium', 100, 450, 50,
        NULL);
INSERT INTO public.armor
VALUES (51, 'TR-7 Ambassador of the Brand',
        'Promotional armor made by SUMY Corp. as part of a highly successful marketing campaign for frozen yogurt.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (52, 'TR-9 Cavalier of Democracy',
        'Bearers of this armor ride no equine mount, but are nonetheless borne to battle atop the trusty steed of Liberty.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (53, 'PH-202 Twigsnapper',
        'The omission of upper-limb coverings allows for optimized freedom of movement, perspiration, and communication of upper body strength to squadmates.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (54, 'PH-9 Predator',
        'Based on the uniform of Jackle 6, a veteran of the Viper Commandos who held off an entire Terminid brood on Nublaria in the First Galactic War with nothing but a machine gun, pocket knife, and Orbital Laser Strikes.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (55, 'I-44 Salamander',
        'The signature orange pauldron allows easy battlefield detection of the bearer, alive or dead, on ash-strewn battlefields.',
        'Heavy', 150, 450, 50, NULL);
INSERT INTO public.armor
VALUES (62, 'UF-16 Inspector',
        'Made famous by the "Truth Enforcers: Enforcers of Truth" mystery novels, this armor calls to mind those paragons of patriotism who protect us from treasonous lies.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (56, 'I-92 Fire Fighter',
        'The heavy rubber tunic and reflective limb guards, originally designed to save citizens from burning buildings, now enable the liberal application of the cleansing fires of Justice.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (57, 'I-09 Heatseeker',
        'The burnished blood-red plates are forged in righteous fire, like the heroes they were wrought to protect.',
        'Light', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (58, 'I-102 Draconaught',
        'Completely sheathed in 14-cm silica fiber foam, except for a thin tube to the ear canal to enable hearing the satisfying screeches of Freedom''s enemies as they burn.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (59, 'AF-50 Noxious Ranger',
        'We fear not poison, fear not death; spite our foes with every breath.” From the beloved classic Hazard Pay: The Musical.',
        'Medium', 50, 550, 125, NULL);
INSERT INTO public.armor
VALUES (60, 'AF-02 Haz-Master',
        'Developed by the Ministry of Science while investigating the phenomenon known as The Gloom, this armor is non-permeable and squeak resistant.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (61, 'UF-50 Bloodhound',
        'Users are advised not to scratch at the lacquer, as the Red 20,000 pigment that gives this armor its signature sheen may be correlated with rapid DNA unspooling.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (63, 'UF-84 Doubt Killer',
        'Developed by the Ministry of Science while investigating the phenomenon known as The Gloom, this armor is non-permeable and squeak resistant.',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (64, 'DP-00 Tactical',
        'This classic armour set is recognised by every citizen: worn by the heroic Helldivers who battled and forever defeated the Terminids, Cyborgs, and the Illuminate in the First Galactic War',
        'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (65, 'PH-56 Jaguar', '', 'Medium', 100, 500, 100, NULL);
INSERT INTO public.armor
VALUES (66, 'CE-101 Guerilla Gorilla', '', 'Heavy', 150, 450, 50, NULL);

INSERT INTO public.armor_has_passives
VALUES (1, 4);
INSERT INTO public.armor_has_passives
VALUES (1, 7);
INSERT INTO public.armor_has_passives
VALUES (2, 7);
INSERT INTO public.armor_has_passives
VALUES (3, 11);
INSERT INTO public.armor_has_passives
VALUES (3, 2);
INSERT INTO public.armor_has_passives
VALUES (4, 7);
INSERT INTO public.armor_has_passives
VALUES (5, 8);
INSERT INTO public.armor_has_passives
VALUES (6, 8);
INSERT INTO public.armor_has_passives
VALUES (7, 8);
INSERT INTO public.armor_has_passives
VALUES (8, 8);
INSERT INTO public.armor_has_passives
VALUES (9, 8);
INSERT INTO public.armor_has_passives
VALUES (10, 8);
INSERT INTO public.armor_has_passives
VALUES (11, 8);
INSERT INTO public.armor_has_passives
VALUES (12, 2);
INSERT INTO public.armor_has_passives
VALUES (13, 2);
INSERT INTO public.armor_has_passives
VALUES (14, 8);
INSERT INTO public.armor_has_passives
VALUES (15, 2);
INSERT INTO public.armor_has_passives
VALUES (16, 2);
INSERT INTO public.armor_has_passives
VALUES (17, 2);
INSERT INTO public.armor_has_passives
VALUES (18, 11);
INSERT INTO public.armor_has_passives
VALUES (19, 7);
INSERT INTO public.armor_has_passives
VALUES (19, 6);
INSERT INTO public.armor_has_passives
VALUES (21, 3);
INSERT INTO public.armor_has_passives
VALUES (22, 7);
INSERT INTO public.armor_has_passives
VALUES (23, 9);
INSERT INTO public.armor_has_passives
VALUES (24, 9);
INSERT INTO public.armor_has_passives
VALUES (25, 9);
INSERT INTO public.armor_has_passives
VALUES (26, 12);
INSERT INTO public.armor_has_passives
VALUES (26, 8);
INSERT INTO public.armor_has_passives
VALUES (27, 12);
INSERT INTO public.armor_has_passives
VALUES (28, 12);
INSERT INTO public.armor_has_passives
VALUES (29, 11);
INSERT INTO public.armor_has_passives
VALUES (31, 11);
INSERT INTO public.armor_has_passives
VALUES (32, 11);
INSERT INTO public.armor_has_passives
VALUES (34, 11);
INSERT INTO public.armor_has_passives
VALUES (35, 11);
INSERT INTO public.armor_has_passives
VALUES (36, 11);
INSERT INTO public.armor_has_passives
VALUES (37, 11);
INSERT INTO public.armor_has_passives
VALUES (38, 6);
INSERT INTO public.armor_has_passives
VALUES (39, 3);
INSERT INTO public.armor_has_passives
VALUES (40, 6);
INSERT INTO public.armor_has_passives
VALUES (41, 6);
INSERT INTO public.armor_has_passives
VALUES (42, 6);
INSERT INTO public.armor_has_passives
VALUES (43, 6);
INSERT INTO public.armor_has_passives
VALUES (44, 8);
INSERT INTO public.armor_has_passives
VALUES (45, 3);
INSERT INTO public.armor_has_passives
VALUES (46, 3);
INSERT INTO public.armor_has_passives
VALUES (47, 6);
INSERT INTO public.armor_has_passives
VALUES (48, 2);
INSERT INTO public.armor_has_passives
VALUES (49, 7);
INSERT INTO public.armor_has_passives
VALUES (50, 6);
INSERT INTO public.armor_has_passives
VALUES (51, 7);
INSERT INTO public.armor_has_passives
VALUES (52, 9);
INSERT INTO public.armor_has_passives
VALUES (53, 5);
INSERT INTO public.armor_has_passives
VALUES (54, 5);
INSERT INTO public.armor_has_passives
VALUES (55, 10);
INSERT INTO public.armor_has_passives
VALUES (56, 10);
INSERT INTO public.armor_has_passives
VALUES (57, 10);
INSERT INTO public.armor_has_passives
VALUES (58, 10);
INSERT INTO public.armor_has_passives
VALUES (59, 1);
INSERT INTO public.armor_has_passives
VALUES (60, 1);
INSERT INTO public.armor_has_passives
VALUES (61, 13);
INSERT INTO public.armor_has_passives
VALUES (62, 13);
INSERT INTO public.armor_has_passives
VALUES (63, 13);
INSERT INTO public.armor_has_passives
VALUES (64, 9);
INSERT INTO public.armor_has_passives
VALUES (65, 5);
INSERT INTO public.armor_has_passives
VALUES (66, 8);

INSERT INTO public.cape
VALUES (2, 'Bastion of Integrity', 'A black, red and white cape with some type of war insignia enscribed on the back.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (3, 'Beacon of Mercy',
        'The clasps on this cape are made from melted down Automaton housings—evidence of Democracy''s inevitable triumph.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (4, 'Blazing Samaritan',
        'A white and green cape with red accents. Some type of war insignia is centered on the back.', 'Medium', 100,
        100, 100, NULL);
INSERT INTO public.cape
VALUES (5, 'Botslayer',
        'A cape that strikes a subroutine emulating fear into the CPUs of all Automatons who conduct visual scans of it.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (6, 'Cloak of Posterity''s Gratitude',
        'A representation of the thankfullness of those infinite descendants whose liberated existence we strive to ensure.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (7, 'Cresting Honor', 'An entirely olive-green cape with minimal markings or insignia.', 'Medium', 100, 100, 100,
        NULL);
INSERT INTO public.cape
VALUES (8, 'Dissident''s Nightmare',
        'After extensive testing in PAtriotic Rehabilitation Centers, this design was proved most terrifying to dissent-afflicted individuals.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (9, 'Drape of Glory', 'Research suggests that Helldivers wearing this cape are seen as 17% more patriotic.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (10, 'Drape of Glory', 'Research suggests that Helldivers wearing this cape are seen as 17% more patriotic.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (11, 'Eagle''s Fury',
        'One of the earliest to be mass-produced, this cape has been the final sight of untold numbers of Freedom''s foes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (12, 'Foesmasher',
        'Durable, waterproof, and thermally-lined, surplus units of this cape are favored by domestic campers, to make tents.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (13, 'Freedom''s Tapestry',
        'Let all who see this cape be struck still with Freedom''s beauty, or struck dead with Liberty''s bullets.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (14, 'Harbinger of True Equality',
        'Wearers of this cape know that even enemies of Freedom deserve to be equal. Equally dead.', 'Medium', 100, 100,
        100, NULL);
INSERT INTO public.cape
VALUES (15, 'Independence Bringer',
        'This cape''s cropped length symbolizes the brevity of galactic conflicts, thanks to the efficiency of the Helldivers.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (16, 'Judgement Day',
        'The Helldiver Skull is said to strike fear in the hearts of foes attempting to sneak up on those wearing this cape.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (17, 'Justice for All',
        'Bearers of this cape take upon a sacred duty: that of delivering righteous retribution to every last deserving being.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (18, 'Liberty''s Herald',
        'The two stripes server as a reminder of the two pillars of successful military campaigns: attack, and further attack.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (19, 'Light of Eternal Liberty',
        'A black and white cape with golden accents and geometric shape work. A hypnotizing diamond in the center spreads Democracy far and wide.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (20, 'Light of Eternal Liberty',
        'The unimpeachable justice of this cape''s design is said to blind the enemies of Freedom with its glorious light.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (21, 'Mantle of True Citizenship',
        'The featherlight construction belies the heavy burden this cape entails - to live the Creed of the True Citizen',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (22, 'Martyris Rex', 'It is said that only the truly Democratic can lift this cape to their shoulders.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (23, 'Order of the Venerated Ballot',
        'Adorned with the insignia of the Order of the Venerated Ballot, a Ministry-sanctioned Patriot''s Club for citizens who pledge themselves to preserving the sanctity of voting.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (24, 'Pinions of Everlasting Glory',
        'All but ensures ascension to the immortal ranks of those enshrined in the Super Earth Digital Archive of Valorous Acts',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (25, 'The Cape of Stars and Suffrage',
        'A symbol of Super Earth''s Astral Promise: that every star shall one day illuminate throngs of joyous voters.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (26, 'Tideturner',
        'Some say that a mere glimpse of this cape, fluttering majestically in the breeze, is enough to spur a squad to victory.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (27, 'Tyrant Hunter',
        'The cape''s shredded hem presages the unrelenting savagery its wielder will visit upon the nemeses of Freedom.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (28, 'Unblemished Allegiance',
        'A choir of patriotic schoolchildren sings the Super Earth anthem to each cape as the final step in its production.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (29, 'Unblemished Allegiance',
        'A choir of patriotic schoolchildren sings the Super Earth anthem to each cape as the final step in its production.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (30, 'Will of the People',
        'Contains a grain of sand from Super Earth—so its bearers carry a small piece of Liberty with them, wherever they go.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (31, 'Wings of Valor',
        'Based on the ceremonial pennant flags of early Super Earth, which now adorn the entrance to each Ministry.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (32, 'Fallen Hero’s Vengeance',
        'Our heroic fallen live on in this cape, guiding its bearer''s aim to the heart of those who killed them.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (33, 'Mark of the Crimson Fang',
        'Marks the most obedient of the obedient, those who will strike headlong at the veins of Tyranny and administer the sweet antidote of Freedom.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (34, 'Executioner''s Canopy',
        'Crests the shoulders of those who deliver the final—and most indispensable—stroke of Justice.', 'Medium', 100,
        100, 100, NULL);
INSERT INTO public.cape
VALUES (35, 'Purifying Eclipse',
        'A tribute to the liberation of Choepessa IV in the First Galactic War, in which so much ordnance was detonated that its sun was occluded by ash for an entire lunar cycle.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (36, 'The Breach',
        'As documented in the bestselling graphic novel “The Breach,” the final mission of the 361st “Freedom''s Flame” saw the storied unit deploy straight into the heart of a Supervolcano, sacrificing themselves to trigger an eruption and wipe out a massive Terminid swarm.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (37, 'Standard of Safe Distance', '', 'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (38, 'Patient Zero''s Rememberance', '', 'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (39, 'Pride of the Whistleblower',
        'Granted to the Truth Enforcers'' Informant of the Month, this tasteful cape conjures images of dissident blood on asphalt.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (40, 'Proof of Faultless Virtue',
        'This cape signifies that its wearer thinks, feels, and acts correctly at all times, and thus bears the responsibility to educate and re-educate their fellow citizen.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (41, 'Cover of Darkness',
        'When children have trouble sleeping, tucking them in under this cape reminds them that they are never alone, for Liberty''s unseen defenders are always watching over them.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.cape
VALUES (1, 'Agent of Oblivion',
        '0.05% of profits are donated to Superstone National Park as part of the Ministry of Unity''s ''Greener Galaxy'' campaign.',
        'Medium', 100, 100, 100, 'images/7993acf3-e6e4-455c-b91d-f65bdca3dbdf.png');

INSERT INTO public.cape_has_passives
VALUES (1, 4);
INSERT INTO public.cape_has_passives
VALUES (2, 4);
INSERT INTO public.cape_has_passives
VALUES (3, 4);
INSERT INTO public.cape_has_passives
VALUES (4, 4);
INSERT INTO public.cape_has_passives
VALUES (5, 4);
INSERT INTO public.cape_has_passives
VALUES (6, 4);
INSERT INTO public.cape_has_passives
VALUES (7, 4);
INSERT INTO public.cape_has_passives
VALUES (8, 4);
INSERT INTO public.cape_has_passives
VALUES (9, 4);
INSERT INTO public.cape_has_passives
VALUES (11, 4);
INSERT INTO public.cape_has_passives
VALUES (12, 4);
INSERT INTO public.cape_has_passives
VALUES (13, 4);
INSERT INTO public.cape_has_passives
VALUES (14, 4);
INSERT INTO public.cape_has_passives
VALUES (15, 4);
INSERT INTO public.cape_has_passives
VALUES (16, 4);
INSERT INTO public.cape_has_passives
VALUES (17, 4);
INSERT INTO public.cape_has_passives
VALUES (18, 4);
INSERT INTO public.cape_has_passives
VALUES (19, 4);
INSERT INTO public.cape_has_passives
VALUES (21, 4);
INSERT INTO public.cape_has_passives
VALUES (22, 4);
INSERT INTO public.cape_has_passives
VALUES (23, 4);
INSERT INTO public.cape_has_passives
VALUES (24, 4);
INSERT INTO public.cape_has_passives
VALUES (25, 4);
INSERT INTO public.cape_has_passives
VALUES (26, 4);
INSERT INTO public.cape_has_passives
VALUES (27, 4);
INSERT INTO public.cape_has_passives
VALUES (28, 4);
INSERT INTO public.cape_has_passives
VALUES (30, 4);
INSERT INTO public.cape_has_passives
VALUES (31, 4);
INSERT INTO public.cape_has_passives
VALUES (32, 4);
INSERT INTO public.cape_has_passives
VALUES (33, 4);
INSERT INTO public.cape_has_passives
VALUES (34, 4);
INSERT INTO public.cape_has_passives
VALUES (35, 4);
INSERT INTO public.cape_has_passives
VALUES (36, 4);
INSERT INTO public.cape_has_passives
VALUES (37, 4);
INSERT INTO public.cape_has_passives
VALUES (38, 4);
INSERT INTO public.cape_has_passives
VALUES (39, 4);
INSERT INTO public.cape_has_passives
VALUES (40, 4);
INSERT INTO public.cape_has_passives
VALUES (41, 4);

INSERT INTO public.helmet
VALUES (1, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (2, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (3, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (4, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (5, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (6, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (7, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (8, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (9, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (10, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (11, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (12, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (13, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (14, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (15, 'B-01 Tactical',
        'This armor is the Super Earth Standard Issue, made from the same titanium alloy as the Destroyer''s hull.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (16, 'B-08 Light Gunner',
        'Compact and flexible, this kevlar armor adds minimal mass, making it a common choice for Helldiver fitness tests.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (17, 'B-24 Enforcer', 'In field tests, 84% of users said that the armor improved their posture and self-esteem.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (18, 'B-27 Fortified Commando',
        'This armor set first appeared in the music video for the summer anthem ''Our Love is Like Liberty (Indestructible)''.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (19, 'CE-07 Demolition Specialist',
        'Originally worn by lunar terraformers, this suit can withstand rapid changes in pressure, heat, and personal velocity.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (20, 'CE-27 Ground Breaker',
        '''The ground is just another obstacle that hasn''t yet been cleared.'' - SGM Janet Jones, Excavation Corps Founder.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (21, 'CE-35 Trench Engineer',
        'After colonists of Hellmire recovered a lost shipment of this armor, the local pastime of fence-smashing was born.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (22, 'CE-35 Trench Engineer',
        'After colonists of Hellmire recovered a lost shipment of this armor, the local pastime of fence-smashing was born.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (23, 'CE-64 Grenadier',
        'The set''s classic advertising campaign ''Have you tried a grenade?'' has remained unchanged for over 70 years',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (24, 'CE-67 Titan',
        'A quality product, this armor can destroy over 300,000 kilometers of fencing with no decline in operational efficiency.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (25, 'CE-74 Breaker',
        'A domestic version of this armor is available for citizens who wish to perform efficient home renovation projects.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (26, 'CE-81 Juggernaut',
        'One of the most durable engineer armors available, each set is quality tested by an impact with a full-grown Charger.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (27, 'CM-06 Combat Medic',
        'This armor was designed by PFC Rodney A. Carmichael, the first Helldiver to use a stim on an ally instead of himself.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (28, 'CM-09 Bonesnapper',
        'Based on a colonial surgeon''s gown, where surgeries were often interrupted by a need to perform defensive duties',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (29, 'CM-09 Bonesnapper',
        'Based on a colonial surgeon''s gown, where surgeries were often interrupted by a need to perform defensive duties.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (30, 'CM-10 Clinician',
        'Featuring patented reverse-seam technology, to reduce the likelihood of bodily fluids entering the armor''s interior.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (31, 'CM-14 Physician',
        'The distinctive red, white, and green of the Intergalactic Medical Corps signal to all Helldivers that help is at hand.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (32, 'CM-14 Physician',
        'The distinctive red, white, and green of the Intergalactic Medical Corps signal to all Helldivers that help is at hand.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (33, 'CM-17 Butcher',
        'An armor often worn by frontline surgeons, who are skilled at both putting bodies back together and taking them apart.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (34, 'CM-21 Trench Paramedic',
        'The suit was once designed to hold a variety of battlefield medical equipment. Now it holds a generous supply of stims.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (35, 'CW-22 Kodiak',
        'The CW-22 Kodiak armor was thoroughly pressure-tested by patriotic volunteers, as part of the ''Test Subjects for Super-Earth'' Citizen Advancement Program.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (36, 'CW-36 Winter Warrior',
        'Offering camouflage in snowy environments, surplus sets of this armor are used by nature photographers and keen hunters alike.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (37, 'CW-36 Winter Warrior',
        'Offering camouflage in snowy environments, surplus sets of this armor are used by nature photographers and keen hunters alike.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (38, 'CW-4 Arctic Ranger',
        'Features a utility belt with pockets that can be filled with any number of things, such as pocket knives, mementos from home, and interesting rocks.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (39, 'CW-9 White Wolf',
        'The pattern used for this armor is the result of the Winter Camouflage Improvement Effort, which considered 136 entrants before determining the color white would best blend in with snow.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (40, 'DP-11 Champion of the People',
        'The three stripes on the pauldrons stand for the three principles of Super Earth: Liberty, Democracy, and Prosperity.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (41, 'DP-11 Champion of the People',
        'The three stripes on the pauldrons stand for the three principles of Super Earth: Liberty, Democracy, and Prosperity.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (42, 'DP-40 Hero of the Federation',
        'Though originally intended solely for ceremonial use, its inspirational energy proved equally useful on the battlefield.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (43, 'DP-40 Hero of the Federation',
        'Though originally intended solely for ceremonial use, its inspirational energy proved equally useful on the battlefield.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (44, 'DP-53 Savior of the Free',
        'A faithful replica of the armor worn at The Battle of Liberty Peak. Honor their legacy, and wear it with pride.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (45, 'EX-00 Prototype X',
        'The end result of several billion Super Credits and 12 years of research into creating “the Solider of Tomorrow”.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (46, 'EX-00 Prototype X',
        'The end result of several billion Super Credits and 12 years of reseach into creating ''the Soldier of Tomorrow.''',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (47, 'EX-03 Prototype 3',
        'Because this prototype’s wires operate at 400,000 volts, it also includes a handy rubber underlayer for insulation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (48, 'EX-03 Prototype 3',
        'Because this prototype''s wires operate at 400,000 volts, it also includes a handy rubber underlayer for insulation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (49, 'EX-16 Prototype 16',
        'As the electric arc generates a strong magnetic field, wearers should avoid use while in vicinity of stapled paperwork.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (50, 'EX-16 Prototype 16',
        'As the electric arc generates a strong magnetic field, wearers should avoid use while in the vicinity of stapled paperwork',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (51, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (52, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (53, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (54, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (55, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (56, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (57, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (58, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (59, 'FS-05 Marksman',
        'While early prototypes used shock-absorbing gels, this armor stabilizes aim with the use of internal gyroscopes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (60, 'FS-11 Executioner',
        'Popularized by actor Chip Messiter, who wore this in the action-rom-com-musical ''Lost My Heart to a Man in a Helmet.''',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (61, 'FS-23 Battle Master',
        'This aim-stabilizing armor found surprising secondary market success among alien birdwatching enthusiasts.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (62, 'FS-23 Battle Master',
        'This aim-stabilizing armor found surprising secondary market success among alien birdwatching enthusiasts.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (63, 'FS-34 Exterminator',
        'Features a patented non-stick coating, which makes scraping viscera off after a long day of battle less taxing.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (64, 'FS-37 Ravager',
        'Contains many small pockets, allowing the user to evenly distribute the weight of ammunition, samples, and cool rocks.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (65, 'FS-38 Eradicator',
        'First deployed in the mines of Cyberstan, where it offered protection against explosions in the hydrogen-rich caverns.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (66, 'FS-55 Devastator',
        'Domestic versions of this armor enable colonial farmers to plant crops and mines side by side, safely.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (67, 'FS-61 Dreadnought',
        'With genuine gold accents, 74% of colonists voted this armor the set they would most like to be buried in.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (68, 'SA-04 Combat Technician',
        'Due to the enhanced strength caused by this armor, caution is advised when using door handles or embracing colleagues.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (69, 'SA-04 Combat Technician',
        'Due to the enhanced strength caused by this armor, caution is advised when using door handles or embracing colleagues.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (70, 'SA-12 Servo Assisted',
        'Each servo-assisted limb contains 138 miniature motors, to support a natural gait and long-term spinal health.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (71, 'SA-12 Servo-Assisted',
        'Each servo-assisted limb contains 138 miniature motors, to support a natural gait and long-term spinal health.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (72, 'SA-25 Steel Trooper',
        'For optimal performance, the manufacturer recommends avoiding immersing this armor in salt water for prolonged periods.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (73, 'SA-25 Steel Trooper',
        'For optimal performance, the manufacturer recommends avoiding immersing this armor in salt water for prolonged periods.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (74, 'SA-32 Dynamo',
        'In mountainous colonies, domestic variants of this armor are used to throw weather monitoring equipment uphill.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (75, 'SA-32 Dynamo',
        'In mountainous colonies, domestic variants of this armor are used to throw weather monitoring equipment uphill.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (76, 'SC-15 Drone Master',
        'Some soldiers report picking up strange radio interference when wearing this armor near alien artifacts.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (77, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (78, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (79, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (80, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (81, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (82, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (83, 'SC-30 Trailblazer Scout',
        'The patented fabric absorbs visible, infrared, and ultraviolet radiation, to prevent detection by all known species.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (84, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (85, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (86, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (87, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (88, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (89, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (90, 'SC-34 Infiltrator',
        'This suit''s plutonium-238 nuclear battery enables environmental scanning long after the user has ceased operation.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (91, 'SC-37 Legionnaire',
        'This armor is based on the antique uniforms of the ''Super Earth Legion'', a less patriotic precursor to the Helldivers.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (92, 'TR-117 Alpha Commander',
        'For warriors who are so strong and confident that they don''t need any reassurance whatsoever.', 'Medium', 100,
        100, 100, NULL);
INSERT INTO public.helmet
VALUES (93, 'TR-40 Gold Eagle',
        'This high-visibility armor allows it''s bearer to be easily seen through smoke, fog, and spewing viscera.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (94, 'TR-62 Knight', 'Crafted to deliver Justice to the darkest crevices of the galaxy.', 'Medium', 100, 100,
        100, NULL);
INSERT INTO public.helmet
VALUES (95, 'TR-7 Ambassador of the Brand',
        'Promotional armor made by SUMY Corp. as part of a highly successful marketing campaign for frozen yogurt.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (96, 'TR-9 Cavalier of Democracy',
        'Bearers of this armor ride no equine mount, but are nonetheless borne to battle atop the trusty steed of Liberty.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (97, 'PH-202 Twigsnapper',
        'The omission of upper-limb coverings allows for optimized freedom of movement, perspiration, and communication of upper body strength to squadmates.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (98, 'PH-9 Predator',
        'Based on the uniform of Jackle 6, a veteran of the Viper Commandos who held off an entire Terminid brood on Nublaria in the First Galactic War with nothing but a machine gun, pocket knife, and Orbital Laser Strikes.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (99, 'I-44 Salamander',
        'The signature orange pauldron allows easy battlefield detection of the bearer, alive or dead, on ash-strewn battlefields.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (100, 'I-92 Fire Fighter',
        'The heavy rubber tunic and reflective limb guards, originally designed to save citizens from burning buildings, now enable the liberal application of the cleansing fires of Justice.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (101, 'I-09 Heatseeker',
        'The burnished blood-red plates are forged in righteous fire, like the heroes they were wrought to protect.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (102, 'I-102 Draconaught',
        'Completely sheathed in 14-cm silica fiber foam, except for a thin tube to the ear canal to enable hearing the satisfying screeches of Freedom''s enemies as they burn.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (103, 'AF-50 Noxious Ranger',
        'We fear not poison, fear not death; spite our foes with every breath.” From the beloved classic Hazard Pay: The Musical.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (104, 'AF-02 Haz-Master',
        'Developed by the Ministry of Science while investigating the phenomenon known as The Gloom, this armor is non-permeable and squeak resistant.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (105, 'UF-50 Bloodhound',
        'Users are advised not to scratch at the lacquer, as the Red 20,000 pigment that gives this armor its signature sheen may be correlated with rapid DNA unspooling.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (106, 'UF-16 Inspector',
        'Made famous by the "Truth Enforcers: Enforcers of Truth" mystery novels, this armor calls to mind those paragons of patriotism who protect us from treasonous lies.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (107, 'UF-84 Doubt Killer',
        'Developed by the Ministry of Science while investigating the phenomenon known as The Gloom, this armor is non-permeable and squeak resistant.',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (108, 'DP-00 Tactical',
        'This classic armour set is recognised by every citizen: worn by the heroic Helldivers who battled and forever defeated the Terminids, Cyborgs, and the Illuminate in the First Galactic War',
        'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (109, 'PH-56 Jaguar', '', 'Medium', 100, 100, 100, NULL);
INSERT INTO public.helmet
VALUES (110, 'CE-101 Guerilla Gorilla', '', 'Medium', 100, 100, 100, NULL);

INSERT INTO public.helmet_has_passives
VALUES (1, 4);
INSERT INTO public.helmet_has_passives
VALUES (16, 4);
INSERT INTO public.helmet_has_passives
VALUES (17, 4);
INSERT INTO public.helmet_has_passives
VALUES (18, 4);
INSERT INTO public.helmet_has_passives
VALUES (19, 4);
INSERT INTO public.helmet_has_passives
VALUES (20, 4);
INSERT INTO public.helmet_has_passives
VALUES (21, 4);
INSERT INTO public.helmet_has_passives
VALUES (23, 4);
INSERT INTO public.helmet_has_passives
VALUES (24, 4);
INSERT INTO public.helmet_has_passives
VALUES (25, 4);
INSERT INTO public.helmet_has_passives
VALUES (26, 4);
INSERT INTO public.helmet_has_passives
VALUES (27, 4);
INSERT INTO public.helmet_has_passives
VALUES (28, 4);
INSERT INTO public.helmet_has_passives
VALUES (30, 4);
INSERT INTO public.helmet_has_passives
VALUES (31, 4);
INSERT INTO public.helmet_has_passives
VALUES (33, 4);
INSERT INTO public.helmet_has_passives
VALUES (34, 4);
INSERT INTO public.helmet_has_passives
VALUES (35, 4);
INSERT INTO public.helmet_has_passives
VALUES (36, 4);
INSERT INTO public.helmet_has_passives
VALUES (38, 4);
INSERT INTO public.helmet_has_passives
VALUES (39, 4);
INSERT INTO public.helmet_has_passives
VALUES (40, 4);
INSERT INTO public.helmet_has_passives
VALUES (42, 4);
INSERT INTO public.helmet_has_passives
VALUES (44, 4);
INSERT INTO public.helmet_has_passives
VALUES (45, 4);
INSERT INTO public.helmet_has_passives
VALUES (47, 4);
INSERT INTO public.helmet_has_passives
VALUES (49, 4);
INSERT INTO public.helmet_has_passives
VALUES (51, 4);
INSERT INTO public.helmet_has_passives
VALUES (60, 4);
INSERT INTO public.helmet_has_passives
VALUES (61, 4);
INSERT INTO public.helmet_has_passives
VALUES (63, 4);
INSERT INTO public.helmet_has_passives
VALUES (64, 4);
INSERT INTO public.helmet_has_passives
VALUES (65, 4);
INSERT INTO public.helmet_has_passives
VALUES (66, 4);
INSERT INTO public.helmet_has_passives
VALUES (67, 4);
INSERT INTO public.helmet_has_passives
VALUES (68, 4);
INSERT INTO public.helmet_has_passives
VALUES (70, 4);
INSERT INTO public.helmet_has_passives
VALUES (71, 4);
INSERT INTO public.helmet_has_passives
VALUES (72, 4);
INSERT INTO public.helmet_has_passives
VALUES (74, 4);
INSERT INTO public.helmet_has_passives
VALUES (76, 4);
INSERT INTO public.helmet_has_passives
VALUES (77, 4);
INSERT INTO public.helmet_has_passives
VALUES (84, 4);
INSERT INTO public.helmet_has_passives
VALUES (91, 4);
INSERT INTO public.helmet_has_passives
VALUES (92, 4);
INSERT INTO public.helmet_has_passives
VALUES (93, 4);
INSERT INTO public.helmet_has_passives
VALUES (94, 4);
INSERT INTO public.helmet_has_passives
VALUES (95, 4);
INSERT INTO public.helmet_has_passives
VALUES (96, 4);
INSERT INTO public.helmet_has_passives
VALUES (97, 4);
INSERT INTO public.helmet_has_passives
VALUES (98, 4);
INSERT INTO public.helmet_has_passives
VALUES (99, 4);
INSERT INTO public.helmet_has_passives
VALUES (100, 4);
INSERT INTO public.helmet_has_passives
VALUES (101, 4);
INSERT INTO public.helmet_has_passives
VALUES (102, 4);
INSERT INTO public.helmet_has_passives
VALUES (103, 4);
INSERT INTO public.helmet_has_passives
VALUES (104, 4);
INSERT INTO public.helmet_has_passives
VALUES (105, 4);
INSERT INTO public.helmet_has_passives
VALUES (106, 4);
INSERT INTO public.helmet_has_passives
VALUES (107, 4);
INSERT INTO public.helmet_has_passives
VALUES (108, 4);
INSERT INTO public.helmet_has_passives
VALUES (109, 4);
INSERT INTO public.helmet_has_passives
VALUES (110, 4);

INSERT INTO public.primary_weapon
VALUES (1, 'AR-23 Liberator',
        'The SEAF standard assault rifle, balancing power, fire rate, and weight for a reliable weapon against smaller targets.',
        'Assault Rifle', 70, 45, 14, 640, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (2, 'AR-23P Liberator Penetrator',
        'A modified Liberator featuring a scope and firing armor-piercing rounds, to help users take down armored targets.',
        'Assault Rifle', 60, 45, 18, 640, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (3, 'AR-23C Liberator Concussive',
        'A modified Liberator featuring explosive rounds and a red-dot sight. Trades increased damage for increased recoil.',
        'Assault Rifle', 65, 30, 28, 320, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (4, 'SG-8 Punisher',
        'A powerful dual magazine pump-action shotgun, with limited armor penetration. Ideal for small and fast targets.',
        'Shotgun', 405, 16, 120, 80, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (5, 'SG-8P Punisher Plasma',
        'A modified Punisher shotgun firing exploding plasma rounds. Fire carefully - exploding plasma can injure squadmates.',
        'Energy-based', 250, 8, 35, 100, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (6, 'SG-8S Slugger',
        'A modified Punisher shotgun firing heavy, high-damage slug rounds. Perfect for punching holes in big targets.',
        'Shotgun', 250, 16, 120, 80, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (7, 'SG-225 Breaker',
        'A fully-automatic shotgun with a high rate of fire, excellent for controlling crowds. Requires frequent reloading.',
        'Shotgun', 330, 16, 55, 300, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (8, 'SG-225IE Breaker Incendiary',
        'A modified Breaker shotgun firing incendiary projectiles. Generates heat during use, so limited to burst fire.',
        'Shotgun', 240, 25, 41, 300, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (9, 'SG-225SP Breaker Spray&Pray',
        'A modified Breaker shotgun firing birdshot, small pellets which saturate an area to clear up smaller targets.',
        'Shotgun', 240, 26, 45, 330, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (10, 'ARC-12 Blitzer',
        'This shotgun blasts a wide burst of high-voltage electricity that arcs between all units - enemy or otherwise - within range.',
        'Energy-based', 250, 999, 60, 45, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (11, 'MP-98 Knight',
        'A submachine gun with an extremely high rate of fire, which can be operated with one hand. Ideal for multitasking.',
        'SMG', 65, 50, 15, 1380, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (12, 'SMG-37 Defender',
        'A high-caliber submachine gun which can be fired with one hand. Has a relatively low rate of fire.', 'SMG', 75,
        45, 10, 520, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (13, 'R-63 Diligence',
        'This high-caliber marksman rifle trades magazine capacity and rate of fire for powerful, accurate shots.',
        'Marksman Rifle', 165, 20, 35, 350, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (14, 'R-63CS Diligence Counter Sniper',
        'A modified Diligence rifle offering increased damage, but a reduced rate of fire. Fires a single bullet at a time.',
        'Marksman Rifle', 200, 15, 53, 350, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (15, 'LAS-5 Scythe',
        'A laser rifle firing a continuous beam. Does not need reloading, but if it overheats a new heat sink must be fitted.',
        'Energy-based', 350, 8, 0, 0, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (16, 'LAS-16 Sickle',
        'A laser rifle, firing in short bursts. Does not need reloading, but if it overheats a new heat sink must be fitted.',
        'Energy-based', 55, 7, 2, 750, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (17, 'PLAS-1 Scorcher',
        'A plasma rifle, firing a bolt of superheated gas which explodes on impact. Avoid standing in proximity to the blast.',
        'Energy-based', 200, 20, 20, 350, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (18, 'JAR-5 Dominator',
        'Firing jet-propelled rounds, the Dominator trades fire rate and magazine capacity for increased damage per projectile.',
        'Special', 275, 15, 75, 250, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (19, 'BR-14 Adjudicator',
        'An accurate, armor-penetrating rifle, the BR-14 Adjudicator delivers righteous judgement to medium-sized enemies, though its restrictive magazine limits its effectiveness against large groups.',
        'Assault Rifle', 90, 30, 38, 550, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (20, 'R-36 Eruptor',
        'This bolt-action rifle fires jet-assisted shells that explode shrapnel in all directions upon impact. Not recommended for close-quarters use.',
        'Explosive', 455, 5, 75, 25, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (21, 'CB-9 Exploding Crossbow',
        'Fires powerful exploding bolts that do maximum damage upon direct impact. Gravity must be accounted for when aiming.',
        'Explosive', 620, 5, 35, 50, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (22, 'AR-61 Tenderizer',
        'A high-caliber assault rifle with a restrictive magazine size but more stopping power.', 'Assault Rifle', 95,
        35, 10, 600, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (23, 'SMG-72 Pummeler', 'Fires concussive rounds that stagger enemies. Slower rate of fire than other SMGs.',
        'SMG', 65, 45, 10, 475, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (24, 'PLAS-101 Purifier',
        'A plasma rifle firing a bolt of superheated gas which explodes on impact. Each shot needs to be charged up fully before it can be fired.',
        'Energy-based', 500, 15, 20, 1000, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (25, 'AR-23A Liberator Carbine',
        'A compact version of the Liberator designed for increased viability in close quarters. Has an increased fire rate at the cost of higher spread.',
        'Assault Rifle', 70, 45, 25, 920, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (26, 'SG-451 Cookout',
        'A pump shotgun that fires a burst of incendiary phosphorus pellets, setting targets ablaze.', 'Shotgun', 320,
        16, 100, 80, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (27, 'FLAM-66 Torcher',
        'A lightweight flamethrower. Shoots pressurized fuel through a dispersion nozzle into an open flame', 'Special',
        375, 80, 2, 0, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (28, 'SG-20 Halt',
        'A humane compliance weapon with two seperate magazines: one for armor-penetrating flechette rounds and one for stun rounds.',
        'Shotgun', 385, 16, 120, 80, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (29, 'SMG-32 Reprimand',
        'A heavy-duty submachine gun that fires large-caliber rounds, with a slower rate of fire to manage the high recoil. Ideal for use at close to medium range',
        'SMG', 125, 25, 44, 490, NULL, 'Light');
INSERT INTO public.primary_weapon
VALUES (30, 'R-2124 Constitution',
        'This ceremonial rifle is modeled after antique relics from pre-Democratic times. It is traditionally gifted to every citizen upon turning 16 to encourage service.',
        'Marksman Rifle', 180, 5, 15, 60, NULL, 'Light');

INSERT INTO public.primary_weapon_has_firing_modes
VALUES (1, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (1, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (1, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (2, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (2, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (2, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (3, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (3, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (4, 3);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (5, 3);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (6, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (7, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (7, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (8, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (8, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (9, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (9, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (10, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (11, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (11, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (11, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (12, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (12, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (12, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (13, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (14, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (15, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (16, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (17, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (17, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (18, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (18, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (19, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (19, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (20, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (21, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (22, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (22, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (22, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (23, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (23, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (23, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (24, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (25, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (25, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (25, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (26, 3);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (27, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (28, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (29, 5);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (29, 6);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (29, 4);
INSERT INTO public.primary_weapon_has_firing_modes
VALUES (30, 1);

INSERT INTO public.primary_weapon_has_traits
VALUES (1, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (2, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (3, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (4, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (4, 2);
INSERT INTO public.primary_weapon_has_traits
VALUES (5, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (5, 5);
INSERT INTO public.primary_weapon_has_traits
VALUES (6, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (6, 2);
INSERT INTO public.primary_weapon_has_traits
VALUES (7, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (8, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (8, 8);
INSERT INTO public.primary_weapon_has_traits
VALUES (9, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (10, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (11, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (11, 9);
INSERT INTO public.primary_weapon_has_traits
VALUES (12, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (12, 9);
INSERT INTO public.primary_weapon_has_traits
VALUES (13, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (14, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (15, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (15, 4);
INSERT INTO public.primary_weapon_has_traits
VALUES (15, 11);
INSERT INTO public.primary_weapon_has_traits
VALUES (16, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (16, 11);
INSERT INTO public.primary_weapon_has_traits
VALUES (17, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (17, 5);
INSERT INTO public.primary_weapon_has_traits
VALUES (18, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (19, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (20, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (20, 5);
INSERT INTO public.primary_weapon_has_traits
VALUES (21, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (21, 9);
INSERT INTO public.primary_weapon_has_traits
VALUES (21, 5);
INSERT INTO public.primary_weapon_has_traits
VALUES (22, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (23, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (23, 9);
INSERT INTO public.primary_weapon_has_traits
VALUES (24, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (24, 5);
INSERT INTO public.primary_weapon_has_traits
VALUES (24, 7);
INSERT INTO public.primary_weapon_has_traits
VALUES (25, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (26, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (26, 2);
INSERT INTO public.primary_weapon_has_traits
VALUES (26, 8);
INSERT INTO public.primary_weapon_has_traits
VALUES (27, 8);
INSERT INTO public.primary_weapon_has_traits
VALUES (28, 6);
INSERT INTO public.primary_weapon_has_traits
VALUES (28, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (28, 2);
INSERT INTO public.primary_weapon_has_traits
VALUES (29, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (30, 1);
INSERT INTO public.primary_weapon_has_traits
VALUES (30, 2);

INSERT INTO public.secondary_weapon
VALUES (1, 'P-2 Peacemaker',
        'The SEAF standard pistol - offering a high fire rate, generous capacity, and fast reloading.', NULL, 75, 15,
        23, 900, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (2, 'P-19 Redeemer',
        'A fully-automatic pistol with an extremely high fire rate, allowing for efficient crowd control.', NULL, 60,
        31, 15, 1100, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (3, 'P-4 Senator',
        'A high-damage revolver, which can be reloaded with single rounds. A heavy-hitting and reliable sidearm.', NULL,
        200, 6, 43, 200, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (4, 'LAS-7 Dagger',
        'A laser pistol that fires a continuous beam. Does not require ammo but can overheat and need to change batteries.',
        NULL, 250, 7, 0, 0, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (5, 'GP-31 Grenade Pistol', 'A pistol that fires grenades. Must be reloaded between shots.', NULL, 650, 1, 43,
        900, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (6, 'P-113 Verdict',
        'The gas-operated, semiautomatic P-113 chambers the 14mm ''Rapid Deliberation,'' the largest centerfire cartridge of any magazine-fed pistol.',
        NULL, 125, 10, 40, 450, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (7, 'SG-22 Bushwhacker',
        'A triple-barreled, break-action, sawed-off shotgun. Switch firing modes to fire all three barrels at once.',
        NULL, 405, 3, 170, 650, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (8, 'P-72 Crisper', 'A compact handgun-style flamethrower, able to project a jet of fire over short distances.',
        NULL, 375, 30, 2, 0, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (9, 'P-11 Stim Pistol',
        'Fires a ballistic dart at near-supersonic speeds, allowing the user to stim allies from a distance. Might sting.',
        NULL, 0, 6, 6, 70, NULL, 'Light');
INSERT INTO public.secondary_weapon
VALUES (10, 'PLAS-15 Loyalist',
        'A plasma pistol that charges each shot until the trigger is released. Plasma projectiles explode on impact.',
        NULL, 125, 7, 8, 1000, NULL, 'Light');

INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (1, 5);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (2, 5);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (2, 4);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (3, 5);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (4, 4);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (5, 5);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (6, 5);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (7, 5);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (7, 2);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (8, 4);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (9, 5);
INSERT INTO public.secondary_weapon_has_firing_modes
VALUES (10, 7);

INSERT INTO public.secondary_weapon_has_traits
VALUES (1, 6);
INSERT INTO public.secondary_weapon_has_traits
VALUES (1, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (2, 6);
INSERT INTO public.secondary_weapon_has_traits
VALUES (2, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (3, 3);
INSERT INTO public.secondary_weapon_has_traits
VALUES (3, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (3, 2);
INSERT INTO public.secondary_weapon_has_traits
VALUES (4, 6);
INSERT INTO public.secondary_weapon_has_traits
VALUES (4, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (4, 4);
INSERT INTO public.secondary_weapon_has_traits
VALUES (4, 11);
INSERT INTO public.secondary_weapon_has_traits
VALUES (5, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (5, 5);
INSERT INTO public.secondary_weapon_has_traits
VALUES (6, 1);
INSERT INTO public.secondary_weapon_has_traits
VALUES (6, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (7, 6);
INSERT INTO public.secondary_weapon_has_traits
VALUES (7, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (8, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (8, 8);
INSERT INTO public.secondary_weapon_has_traits
VALUES (9, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (9, 2);
INSERT INTO public.secondary_weapon_has_traits
VALUES (9, 10);
INSERT INTO public.secondary_weapon_has_traits
VALUES (10, 1);
INSERT INTO public.secondary_weapon_has_traits
VALUES (10, 9);
INSERT INTO public.secondary_weapon_has_traits
VALUES (10, 5);
INSERT INTO public.secondary_weapon_has_traits
VALUES (10, 7);

INSERT INTO public.throwable
VALUES (1, 'G-12 High Explosive',
        'A high explosive grenade which damages lightly armored targets. Creates high damage over a small area when detonated.',
        800, 4, 7, 3.5, NULL);
INSERT INTO public.throwable
VALUES (2, 'G-23 Stun', 'Temporarily stuns all targets within the effective radius.', 0, 6, 10, 1.8, NULL);
INSERT INTO public.throwable
VALUES (3, 'G-16 Impact', 'A high explosive grenade which detonates on first impact.', 400, 4, 7, 0, NULL);
INSERT INTO public.throwable
VALUES (4, 'G-3 Smoke',
        'A ''compliance weapon'' to modify enemy behaviour. Creates a thick smoke screen to block targets'' line of sight',
        0, 0, 5, 2.4, NULL);
INSERT INTO public.throwable
VALUES (5, 'G-6 Frag', 'An antipersonnel fragmentation grenade. Creates damage over a large area when detonated.', 500,
        3, 10, 2.4, NULL);
INSERT INTO public.throwable
VALUES (6, 'G-10 Incendiary',
        'An incendiary grenade designed for igniting intense fires upon detonation. Spreads burning material over a moderate area, causing burn damage.',
        300, 3, 7, 2.9, NULL);
INSERT INTO public.throwable
VALUES (7, 'G-123 Thermite Grenade',
        'A thermite grenade designed to adhere to surfaces before burning at 2000°C. Capable of burning through some armor',
        2000, 7, 3, 2.9, NULL);
INSERT INTO public.throwable
VALUES (8, 'G-13 Incendiary Impact',
        'Detonates on impact, covering the immediate vicinity in self-igniting white phosphorus.', 150, 3, 7, 0, NULL);
INSERT INTO public.throwable
VALUES (9, 'K-2 Throwing Knife', 'Delivers silent justice to Freedom''s enemies.', 250, 3, 0, 0, NULL);
INSERT INTO public.throwable
VALUES (10, 'G-4 Gas',
        'A grenade that releases a cloud of toxic gas, effective at blinding and slowing both organic and inorganic enemies.',
        3, 6, 7, 2.9, NULL);


