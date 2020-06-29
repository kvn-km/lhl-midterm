DELETE FROM items;

INSERT INTO items (seller_id, photo, price, title, description, type, is_active, is_sold, is_featured)
VALUES (1,'https://i.ibb.co/6RpfsMV/bed-frame.jpg', 1, 'Almost Deep Green', 'A description for Almost Deep Green', 'bedframe', TRUE, TRUE, FALSE),
       (1,'https://i.ibb.co/zV1pdMg/bookshelf.jpg', 2, 'Fake Ube', 'A description for Fake Ube', 'bookshelf', TRUE, FALSE, FALSE),
       (1,'https://i.ibb.co/xqF3YHX/chair-dining.jpg', 3, 'Socially Distant Blue', 'A description for Socially Distant Blue', 'chair', TRUE, FALSE, TRUE),
       (2,'https://i.ibb.co/tLWVK1N/chair-outdoor.jpg', 4, 'Stock Market Ticker', 'A description for Stock Market Ticker', 'chair', TRUE, FALSE, FALSE),
       (2,'https://i.ibb.co/kh7pnmV/chair-sofa.jpg', 5, 'The Tears She Cried', 'A description for The Tears She Cried', 'chair', TRUE, FALSE, FALSE),
       (2,'https://i.ibb.co/whS23rV/chair.jpg', 6, 'Twenties Themed Party', 'A description for Twenties Themed Party', 'chair', TRUE, FALSE, FALSE),
       (3,'https://i.ibb.co/s9R62Gd/desk.jpg', 7, 'Calm Tefiti', 'A description for Calm Tefiti', 'desk', TRUE, FALSE, FALSE),
       (3,'https://i.ibb.co/Bz2ynV7/dresser.jpg', 8, 'The Fire In Her Eyes', 'A description for The Fire In Her Eyes', 'storage', TRUE, FALSE, FALSE),
       (3,'https://i.ibb.co/6PNpj1Q/table-coffee.jpg', 9, 'Itty Bitty Piggy', 'A description for Itty Bitty Piggy', 'table', TRUE, FALSE, FALSE),
       (4,'https://i.ibb.co/v1RdnSg/table-dining.jpg', 10, 'Rio Party', 'A description for Rio Party', 'table', TRUE, FALSE, FALSE),
       (4,'https://i.ibb.co/GQzGjnX/table-outdoor.jpg', 10, 'Youthful Nostalgia', 'A description for Youthful Nostalgia', 'table', TRUE, FALSE, FALSE),
       (4,'https://i.ibb.co/YXRhV7M/tv-stand.jpg', 11, 'Firey Moss', 'A description for Firey Moss', 'tv stand', TRUE, FALSE, FALSE),
       (5,'https://i.ibb.co/YXRhV7M/tv-stand.jpg', 12, 'Twelfth Purple', 'A description for Twelfth Purple', 'tv stand', TRUE, FALSE, FALSE),
       (5,'https://i.ibb.co/6RpfsMV/bed-frame.jpg', 13, 'Crew Blue', 'A description for Crew Blue', 'bedframe', TRUE, FALSE, FALSE),
       (5,'https://i.ibb.co/GQzGjnX/table-outdoor.jpg', 14, 'Nether Cyan', 'A description for Nether Cyan', 'table', TRUE, FALSE, FALSE),
       (6,'https://i.ibb.co/6RpfsMV/bed-frame.jpg', 15, 'Sailor Blue', 'A description for Sailor Blue', 'bedframe', TRUE, FALSE, FALSE),
       (6,'https://i.ibb.co/zV1pdMg/bookshelf.jpg', 16, 'Purple Gazing Space', 'A description for Purple Gazing Space', 'bookshelf', TRUE, FALSE, FALSE),
       (6,'https://i.ibb.co/xqF3YHX/chair-dining.jpg', 17, 'Eraser Pink', 'A description for Eraser Pink', 'chair', TRUE, FALSE, FALSE),
       (7,'https://i.ibb.co/tLWVK1N/chair-outdoor.jpg', 18, 'Murdered Unicorn', 'A description for Murdered Unicorn', 'chair', TRUE, FALSE, FALSE),
       (7,'https://i.ibb.co/kh7pnmV/chair-sofa.jpg', 19, 'Vibrant Piki', 'A description for Vibrant Piki', 'chair', TRUE, FALSE, FALSE),
       (7,'https://i.ibb.co/whS23rV/chair.jpg', 20, 'Confident Periwinkle', 'A description for Confident Periwinkle', 'chair', TRUE, FALSE, FALSE),
       (8,'https://i.ibb.co/s9R62Gd/desk.jpg', 21, 'Dark Tree', 'A description for Dark Tree', 'desk', TRUE, FALSE, FALSE),
       (8,'https://i.ibb.co/Bz2ynV7/dresser.jpg', 22, 'Puniya', 'A description for Puniya', 'storage', TRUE, FALSE, FALSE),
       (8,'https://i.ibb.co/6PNpj1Q/table-coffee.jpg', 23, 'Spicy Fire Hydrant', 'A description for Spicy Fire Hydrant', 'table', TRUE, FALSE, FALSE),
       (9,'https://i.ibb.co/v1RdnSg/table-dining.jpg', 24, 'Blushing Cacti', 'A description for Blushing Cacti', 'table', TRUE, FALSE, FALSE),
       (9,'https://i.ibb.co/GQzGjnX/table-outdoor.jpg', 25, 'Pickle Jazz Music', 'A description for Pickle Jazz Music', 'table', TRUE, FALSE, FALSE),
       (9,'https://i.ibb.co/v1RdnSg/table-dining.jpg', 26, 'Fuschia Sea', 'A description for Fuschia Sea', 'table', TRUE, FALSE, FALSE),
       (10,'https://i.ibb.co/6PNpj1Q/table-coffee.jpg', 27, 'Not Exactly Lilac', 'A description for Not Exactly Lilac', 'table', TRUE, FALSE, FALSE),
       (10,'https://i.ibb.co/Bz2ynV7/dresser.jpg', 28, 'Lime n Cash', 'A description for Lime n Cash', 'storage', TRUE, FALSE, FALSE),
       (10,'https://i.ibb.co/s9R62Gd/desk.jpg', 29, 'Curtain In A Castle', 'A description for Curtain In A Castle', 'desk', TRUE, FALSE, FALSE),
       (11,'https://i.ibb.co/whS23rV/chair.jpg', 30, 'Blander Than The Rest', 'A description for Blander Than The Rest', 'chair', TRUE, FALSE, FALSE),
       (11,'https://i.ibb.co/kh7pnmV/chair-sofa.jpg', 31, 'Water From Moana', 'A description for Water From Moana', 'chair', TRUE, FALSE, FALSE),
       (11,'https://i.ibb.co/tLWVK1N/chair-outdoor.jpg', 32, 'Hecka Pink', 'A description for Hecka Pink', 'chair', TRUE, FALSE, FALSE),
       (12,'https://i.ibb.co/xqF3YHX/chair-dining.jpg', 33, 'Grape With Preservatives', 'A description for Grape With Preservatives', 'chair', TRUE, FALSE, FALSE),
       (12,'https://i.ibb.co/zV1pdMg/bookshelf.jpg', 34, 'A Blade Of Grass', 'A description for A Blade Of Grass', 'bookshelf', TRUE, FALSE, FALSE),
       (12,'https://i.ibb.co/YXRhV7M/tv-stand.jpg', 35, 'Pistachio', 'A description for Pistachio', 'tv stand', TRUE, FALSE, FALSE);
