BEGIN TRANSACTION;

-- the password for both users is "password"
INSERT INTO users (username,password_hash,role) VALUES ('user','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('admin','$2a$08$UkVvwpULis18S19S5pZFn.YHPZt3oaqHZnDwqbCW9pft6uFtkXKDC','ROLE_ADMIN');
INSERT INTO users (username,password_hash,role) VALUES ('shan','$2a$10$hKGGtT7BDHj.r/Er1KBM1ObFLMSxH4U2rbdmZ30lmW4kOrQ3LVMAe','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('kolt','$2a$10$TQQkJAYzwJlDDhikQOTx1OXT71xei4QSLBth/mmMfv7oiF757DOLi','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('alex','$2a$10$ViisKVC8Jb2KRpcZhAZ/Y.gD2V7tYEKyIOTvMVqWz36ZFUoZ7eKxS','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('gamerstar10','$2a$10$P10i6l34DzLOKEyWW92aoeF8fFL3KsAdGiXXUHY88UW48RNdRHIK2','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('heartplayer3','$2a$10$P1V83d1v6.Of7RdplCe2F.aOhV90W65KKHT7XQPLTFv6/1lELj4he','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('heavyrainfan','$2a$10$.KXqoXN2kpbifDy1AokVZ.atGABevH3Fzc0r9gs27Cr0ud0ZNcJFa','ROLE_USER');
INSERT INTO users (username,password_hash,role) VALUES ('gamerunner15','$2a$10$sHGnQOB8KSf8ZTaGQRojJuBYCVzzd6UvLiwHY03I3FXYQOpQ56nJi','ROLE_USER');

COMMIT TRANSACTION;

begin transaction;

INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (101, 'Elden Ring', 'https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/24076850/elden_ring_bandai_namco.jpg?quality=90&strip=all&crop=21.458333333333,0,57.083333333333,100',3.6);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (102, 'Stardew Valley', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTYjodiC5iI8_dj-2HEzV0cABYfC06q4zc3M_KIdqLiOsZjemmw',4.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3328, 'The Witcher 3: Wild Hunt', 'https://media.rawg.io/media/games/618/618c2031a07bbff6b4f611f10b6bcdbc.jpg',4.7);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (4200, 'Portal 2', 'https://media.rawg.io/media/games/2ba/2bac0e87cf45e5b508f227d281c9252a.jpg',4.6);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (5679, 'The Elder Scrolls V: Skyrim', 'https://media.rawg.io/media/games/7cf/7cfc9220b401b7a300e409e539c9afd5.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (13537, 'Half-Life 2', 'https://media.rawg.io/media/games/b8c/b8c243eaa0fbac8115e0cdccac3f91dc.jpg',4.5);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (802, 'Borderlands 2', 'https://media.rawg.io/media/games/49c/49c3dfa4ce2f6f140cc4825868e858cb.jpg',4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (4286, 'BioShock', 'https://media.rawg.io/media/games/bc0/bc06a29ceac58652b684deefe7d56099.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (32, 'Destiny 2', 'https://media.rawg.io/media/games/34b/34b1f1850a1c06fd971bc6ab3ac0ce0e.jpg',3.5);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (4062, 'BioShock Infinite', 'https://media.rawg.io/media/games/fc1/fc1307a2774506b5bd65d7e8424664a7.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3439, 'Life is Strange', 'https://media.rawg.io/media/games/562/562553814dd54e001a541e4ee83a591c.jpg',4.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (58175, 'God of War (2018)', 'https://media.rawg.io/media/games/4be/4be6a6ad0364751a96229c56bf69be59.jpg',4.6);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (11859, 'Team Fortress 2', 'https://media.rawg.io/media/games/46d/46d98e6910fbc0706e2948a7cc9b10c5.jpg',3.7);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (2454, 'DOOM (2016)', 'https://media.rawg.io/media/games/587/587588c64afbff80e6f444eb2e46f9da.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (4459, 'Grand Theft Auto IV', 'https://media.rawg.io/media/games/4a0/4a0a1316102366260e6f38fd2a9cfdce.jpg',4.3);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (28, 'Red Dead Redemption 2', 'https://media.rawg.io/media/games/511/5118aff5091cb3efec399c808f8c598f.jpg',4.6);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3070, 'Fallout 4', 'https://media.rawg.io/media/games/d82/d82990b9c67ba0d2d09d4e6fa88885a7.jpg',3.8);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3939, 'PAYDAY 2', 'https://media.rawg.io/media/games/73e/73eecb8909e0c39fb246f457b5d6cbbe.jpg',3.5);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (41494, 'Cyberpunk 2077', 'https://media.rawg.io/media/games/26d/26d4437715bee60138dab4a7c8c59c92.jpg',4.2);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (422, 'Terraria', 'https://media.rawg.io/media/games/f46/f466571d536f2e3ea9e815ad17177501.jpg',4.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3272, 'Rocket League', 'https://media.rawg.io/media/games/8cc/8cce7c0e99dcc43d66c8efd42f9d03e3.jpg',3.9);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3192, 'Metal Gear Solid V: The Phantom Pain', 'https://media.rawg.io/media/games/490/49016e06ae2103881ff6373248843069.jpg',4.2);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3287, 'Batman: Arkham Knight', 'https://media.rawg.io/media/games/310/3106b0e012271c5ffb16497b070be739.jpg',4.2);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (23027, 'The Walking Dead: Season 1', 'https://media.rawg.io/media/games/8d6/8d69eb6c32ed6acfd75f82d532144993.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (11973, 'Middle-earth: Shadow of Mordor', 'https://media.rawg.io/media/games/d1a/d1a2e99ade53494c6330a0ed945fe823.jpg',3.9);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (19103, 'Half-Life 2: Lost Coast', 'https://media.rawg.io/media/games/b7b/b7b8381707152afc7d91f5d95de70e39.jpg',3.5);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (9767, 'Hollow Knight', 'https://media.rawg.io/media/games/4cf/4cfc6b7f1850590a4634b08bfab308ab.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (278, 'Horizon Zero Dawn', 'https://media.rawg.io/media/games/b7d/b7d3f1715fa8381a4e780173a197a615.jpg',4.3);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (13536, 'Portal', 'https://media.rawg.io/media/games/7fa/7fa0b586293c5861ee32490e953a4996.jpg',4.5);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (25097, 'The Legend of Zelda: Ocarina of Time', 'https://media.rawg.io/media/games/3a0/3a0c8e9ed3a711c542218831b893a0fa.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (3498, 'Grand Theft Auto V', 'https://media.rawg.io/media/games/20a/20aa03a10cda45239fe22d035c0ebe64.jpg',4.5);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (4291, 'Counter-Strike: Global Offensive', 'https://media.rawg.io/media/games/736/73619bd336c894d6941d926bfd563946.jpg',3.6);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (5286, 'Tomb Raider (2013)', 'https://media.rawg.io/media/games/021/021c4e21a1824d2526f925eff6324653.jpg',4.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (12020, 'Left 4 Dead 2', 'https://media.rawg.io/media/games/d58/d588947d4286e7b5e0e12e1bea7d9844.jpg',4.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (1030, 'Limbo', 'https://media.rawg.io/media/games/942/9424d6bb763dc38d9378b488603c87fa.jpg',4.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (10213, 'Dota 2', 'https://media.rawg.io/media/games/6fc/6fcf4cd3b17c288821388e6085bb0fc9.jpg',3.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (766, 'Warframe', 'https://media.rawg.io/media/games/f87/f87457e8347484033cb34cde6101d08d.jpg',3.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (29028, 'Metro 2033', 'https://media.rawg.io/media/games/120/1201a40e4364557b124392ee50317b99.jpg',3.9);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (7689, 'Rise of the Tomb Raider', 'https://media.rawg.io/media/games/b45/b45575f34285f2c4479c9a5f719d972e.jpg',4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (290856, 'Apex Legends', 'https://media.rawg.io/media/games/737/737ea5662211d2e0bbd6f5989189e4f1.jpg',3.6);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (16944, 'The Witcher 2: Assassins of Kings Enhanced Edition', 'https://media.rawg.io/media/games/6cd/6cd653e0aaef5ff8bbd295bf4bcb12eb.jpg',4.2);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (416, 'Grand Theft Auto: San Andreas', 'https://media.rawg.io/media/games/960/960b601d9541cec776c5fa42a00bf6c4.jpg',4.5);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (27024, 'Super Mario Galaxy', 'https://media.rawg.io/media/games/936/936f0ffac0b3c9f5c8d185f610ed2631.jpg',3.2);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (54751, 'Soulcalibur', 'https://media.rawg.io/media/games/743/7430f1846ba6ce836f169d936c89819e.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (56123, 'Metroid Prime', 'https://media.rawg.io/media/games/c86/c86bc047ba949959a90fe24209d59439.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (27036, 'Super Mario Galaxy 2', 'https://media.rawg.io/media/games/4e9/4e928ff4b4e3c3f5acfda38b98a4cf65.jpg',4.3);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (22509, 'Minecraft', 'https://media.rawg.io/media/games/b4e/b4e4c73d5aa4ec66bbf75375c4847a2b.jpg',4.4);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (9810, 'ARK: Survival Evolved', 'https://media.rawg.io/media/games/58a/58ac7f6569259dcc0b60b921869b19fc.jpg',3.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (1001421, 'RuneScape: Dragonwilds', 'https://media.rawg.io/media/screenshots/1b0/1b0344a463f5883524dea3ae88deb252.jpg',4.1);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (983210, 'Clair Obscur: Expedition 33', 'https://media.rawg.io/media/games/466/4667f17fdee9ebbcea2049e54f8e2b96.jpg',4.3);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (865101, 'The Lord of the Rings: Return to Moria', 'https://media.rawg.io/media/screenshots/d08/d084117899a164fecbdd7ece86e57c6d.jpg',4.8);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (23833, 'Pokémon Snap', 'https://media.rawg.io/media/games/ec4/ec4be61f0f41cf1d138501330a1b54ee.jpg',3.3);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (56174, 'Pokémon Colosseum', 'https://media.rawg.io/media/games/8f7/8f738dce65f8bd826fc7e1b756376f29.jpg',2.8);
INSERT INTO games (api_id, name, image_url, avg_rating) VALUES (747505, 'Pokémon Scarlet and Violet', 'https://media.rawg.io/media/games/5ab/5abb8e4af55eb8c867410c3a740355b9.jpg',3.6);



INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (1, 1, 'Absolutely amazing game. Highly recommended!');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (1, 2, 'Fun and chill farming experience.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (2, 1, 'Challenging but rewarding.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 4, 'With polished gameplay, clever physics-based puzzles, and a co-op mode that demands teamwork and creativity, Portal 2 stands as one of the smartest and most engaging puzzle games ever made. A true classic.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 29, 'A stunning open-world adventure that blends sci-fi and prehistoric elements. Aloy’s journey through a beautifully crafted world of mechanical beasts is gripping, supported by fluid combat and deep lore.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 28, 'A masterpiece of indie gaming, Hollow Knight delivers atmospheric exploration, tight platforming, and challenging combat. The world of Hallownest is rich with secrets and stunning hand-drawn art.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 27, 'A short but visually impressive tech demo that showcases Valve’s HDR rendering. Though brief, its polished combat and stunning coastal views highlight the advancements of the Half-Life engine.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 26, 'An engaging action RPG that lets players roam Tolkien’s universe with brutal combat and the innovative Nemesis system, creating dynamic rivalries with enemies that feel personal.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 25, 'One of the most emotionally charged narrative experiences in gaming. Lee and Clementine’s journey is unforgettable, with gut-wrenching choices that truly shape the story.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 24, 'A deep, choice-driven RPG that laid the groundwork for the acclaimed series. Though rough around the edges, its storytelling and world-building are top-notch.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 23, 'The definitive Batman experience, with fluid combat, a gripping story, and the Batmobile adding new layers to Gotham’s exploration.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 22, 'Hideo Kojima’s magnum opus, offering unparalleled stealth gameplay, deep mechanics, and an open-ended approach to mission completion.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 21, 'A brilliant fusion of soccer and high-speed vehicle physics, delivering endless fun through competitive gameplay and tight mechanics.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 20, 'A sandbox adventure brimming with exploration, crafting, and combat. Its 2D pixel art style hides immense depth and variety.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 19, 'A dystopian RPG with an immersive world and gripping narrative. While it faced technical hurdles at launch, its core storytelling and gameplay mechanics shine.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 18, 'A cooperative heist experience that offers thrilling, strategic gameplay with customizable approaches and tense action.');

INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 17, 'A vast open-world RPG with deep crafting, settlement building, and compelling post-apocalyptic exploration.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 15, 'A gritty, grounded take on the GTA formula, delivering a memorable story with Niko Bellic navigating the criminal underworld.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 14, 'A high-octane shooter that redefines the DOOM legacy with blistering speed, brutal combat, and an adrenaline-fueled soundtrack.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 13, 'A timeless, class-based multiplayer shooter with brilliant character design and endlessly entertaining gameplay.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 12, 'A masterful reinvention of the series, blending emotional storytelling with visceral combat and stunning Norse mythology.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 11, 'A gripping, choice-driven narrative about time travel, friendship, and consequences, with deeply emotional moments and strong character development.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (3, 8, 'A mesmerizing journey through Columbia, packed with mind-bending storytelling, rich lore, and fluid combat.');

INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 29, 'Few games blend mystery, beauty, and discovery like Horizon Zero Dawn. Its world begs to be explored, rewarding players with awe-inspiring landscapes and a deep connection to Aloy''s story.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 28, 'An intricate maze of tunnels, secrets, and challenges, Hollow Knight offers a journey that is as rewarding as it is punishing. Mastering its mechanics feels earned, making every triumph unforgettable.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 27, 'Though brief, Lost Coast represents a turning point in gaming visuals, proving that lighting and environmental design can shape immersion just as much as narrative.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 26, 'Taking down an orc isn''t just another kill—it''s a grudge match. The Nemesis system ensures every battle has weight, turning an already engaging world into something deeply personal.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 25, 'More than a game—it''s a gut-wrenching emotional test. Few stories in gaming have ever packed this much weight into player choices, leaving lasting marks long after the credits roll.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 24, 'A gritty, lore-rich introduction to Geralt''s world, where moral choices feel less like game mechanics and more like true dilemmas. A fascinating first step into a now-iconic RPG franchise.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 23, 'It''s not just about being Batman—it''s about feeling like him. The city''s tension, the weight of responsibility, and the thrill of combat make every moment intensely immersive.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 22, 'Freedom takes center stage. Every mission feels uniquely yours, with limitless tactical choices allowing creativity in gameplay like few other stealth games.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 21, 'Deceptively simple but endlessly deep, Rocket League transforms ordinary physics into thrilling, unpredictable competition that never gets old.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 20, 'What starts as an empty world quickly becomes an adventure uniquely shaped by your imagination. Exploration, creativity, and survival fuse in a way few games achieve.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 19, 'A world brimming with neon-soaked beauty and raw dystopian grit. Beyond the flashy exterior lies a city filled with fascinating characters and meaningful choices.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 18, 'A symphony of chaos. The best moments come from perfectly orchestrating a heist—until things go sideways, forcing adrenaline-fueled improvisation.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 15, 'Liberty City isn''t just a backdrop—it''s a living character. Its realism, weight, and atmosphere make even the simplest interactions feel immersive.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 14, 'Momentum and aggression are everything. Standing still is failure, making combat feel like an exhilarating, perfectly paced dance of destruction.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 13, 'Its charm lies in its characters. Personality oozes from every class, ensuring that no match ever feels the same twice.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 12, 'At its core, it''s a story about a father and son. The emotional weight of Kratos'' journey enhances every battle, making victories more than just triumphs—they''re deeply personal.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 8, 'A journey that challenges perception. By the end, it''s clear—Columbia isn''t just a place, it''s an idea, and what it represents is unforgettable.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 7, 'Loot isn''t just a reward—it''s an obsession. The sheer variety ensures that no two playthroughs ever feel the same.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (4, 6, 'A turning point in gaming. From physics-driven puzzles to impeccable pacing, Half-Life 2 set a benchmark that still influences games today.');

INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 3, 'Few RPGs rival the sheer depth of The Witcher 3. Its gripping story, morally complex choices, and richly detailed world make for an unforgettable experience that redefines the genre.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 4, 'A brilliant evolution of puzzle mechanics, combining witty dialogue, smart physics-based gameplay, and memorable characters to create one of the most satisfying experiences in gaming.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 32, 'A sprawling open-world masterpiece that sets the gold standard for sandbox gameplay. Its engaging narrative, chaotic heists, and breathtaking city immersion make every moment exhilarating.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 34, 'A gritty, cinematic reboot that redefines Lara Croft''s journey. Survival mechanics, tight action sequences, and emotional storytelling breathe new life into the franchise.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 33, 'A tactical FPS that thrives on precision, skill, and teamwork. Its competitive depth and intense gunplay ensure endless replayability, solidifying its place as an esports legend.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 30, 'The foundation of one of gaming''s most brilliant puzzle series. Minimalist yet masterful, it transforms simple concepts into mind-bending challenges while delivering an unforgettable narrative twist.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 35, 'A frantic, fast-paced co-op shooter that makes survival a thrilling experience. Its dynamic AI ensures every zombie horde encounter is unpredictable and intense.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 5, 'An unparalleled open-world experience where every choice feels meaningful. Whether slaying dragons or exploring hidden ruins, Skyrim never ceases to amaze.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 16, 'A breathtaking journey through the dying Wild West, rich with emotionally driven storytelling, masterful world-building, and realistic character development that makes it truly unforgettable.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 8, 'A visually stunning and thought-provoking journey into Columbia, blending tight FPS mechanics with an unsettling yet brilliant narrative that questions reality itself.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 6, 'A groundbreaking FPS that revolutionized gaming with its physics-based mechanics, gripping storytelling, and unforgettable environments.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 7, 'An over-the-top looter-shooter fueled by chaos, humor, and addictive gunplay. No two encounters ever feel the same thanks to its wild arsenal and unpredictable enemies.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 11, 'A deeply emotional, choice-driven narrative that explores time manipulation, friendship, and self-discovery, leaving players reflecting on their own decisions.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 12, 'An awe-inspiring reinvention that blends brutal combat, rich mythology, and emotional storytelling into an unforgettable journey of fatherhood and redemption.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 17, 'A vast post-apocalyptic adventure filled with exploration, settlement-building, and RPG choices that let players shape their own path through the wasteland.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 18, 'A high-stakes cooperative heist experience where meticulous planning meets chaotic execution, making every mission a thrilling challenge.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 36, 'A minimalist indie gem that captivates with eerie atmosphere, clever puzzles, and haunting imagery, proving that storytelling can thrive without words.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 13, 'A multiplayer classic that balances humor, teamwork, and unique class-based gameplay, ensuring that every match is a blast.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 14, 'A relentless, adrenaline-fueled shooter that embraces speed and carnage, delivering one of the most exhilarating combat experiences in modern FPS gaming.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 19, 'A neon-soaked dystopian RPG filled with gripping storytelling, complex characters, and a world that begs to be explored.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 20, 'A sandbox of limitless creativity, blending adventure, crafting, and exploration into an experience as deep as the player''s imagination.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 37, 'A MOBA that defines strategic depth, offering near-endless replayability through its competitive nature and ever-evolving meta.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 38, 'A fast-paced, stylish action RPG that keeps players engaged with fluid movement, deep customization, and exciting cooperative play.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 15, 'A darker, more grounded take on the GTA formula, with an emotionally complex protagonist navigating the criminal underworld.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 21, 'A brilliantly simple yet endlessly fun fusion of soccer and high-speed vehicular physics, perfecting the balance between competition and chaos.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 29, 'A mesmerizing open-world adventure that blends ancient nature with futuristic sci-fi elements, offering fluid combat and a compelling story.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 39, 'A gripping survival horror shooter that thrives on atmospheric storytelling, immersing players in a bleak post-apocalyptic underground.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 40, 'An exhilarating blend of exploration, puzzle-solving, and survival mechanics, further refining Lara Croft''s modern journey.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 23, 'A brilliant sendoff to the Arkham series, seamlessly blending stealth, brutal combat, and an open-world Gotham city brimming with tension.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 22, 'An unmatched stealth-action experience, offering deep mechanics, open-ended mission design, and limitless tactical creativity.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 41, 'A battle royale that thrives on fluid movement, sharp gunplay, and unique hero-based mechanics that set it apart from the competition.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 42, 'A tightly woven narrative-driven RPG that sets the stage for its successor, offering meaningful choices and refined combat.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 24, 'The beginning of an iconic RPG saga, introducing a rich world, deep characters, and choice-driven storytelling that shaped the franchise.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 43, 'A genre-defining open-world experience that introduced RPG mechanics, deep customization, and a sprawling map filled with limitless freedom.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 27, 'A visually stunning showcase of tech advancements, proving how environmental storytelling can enhance immersion.');
INSERT INTO user_reviews (user_id, game_id, review_text) VALUES (5, 26, 'A brutal, engaging RPG that lets players forge their own path through Tolkien''s universe while reshaping enemy hierarchies dynamically.');





INSERT INTO user_games (user_id, game_id, star_rating) VALUES (1, 1, 5);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (1, 2, 4);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (2, 1, 3);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (1, 3, 5);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 4, 5);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 5, 3);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 6, 2);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 7, 4);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 8, 3);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 9, 3);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 10, 4);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 11, 3);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 12, 5);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 13, 3);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 14, 5);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 15, 5);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 16, 4);
INSERT INTO user_games (user_id, game_id, star_rating) VALUES (3, 17, 3);





INSERT INTO wishlist (user_id, game_id) VALUES 
(1, 1), 
(1, 2);

INSERT INTO playing (user_id, game_id) VALUES 
(1, 1), 
(1, 2);

INSERT INTO finished (user_id, game_id) VALUES 
(1, 1), 
(1, 2);

commit;
