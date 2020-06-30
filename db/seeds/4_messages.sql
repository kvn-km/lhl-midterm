DELETE FROM messages;

INSERT INTO messages (sender_id, receiver_id, message, timestamp)
VALUES (12, 11,
       'You came to my desk and said, ''This may sound weird, and there''s no reason for me to know this, but that mixed berry yogurt you''re about to eat has expired.''',
       '2016-06-22 19:10:25'),
       (11, 12,
       'That was the moment that you liked me?',
       '2016-06-22 19:15:59'),
       (12, 11,
       'Yup.',
       '2016-06-22 19:17:00'),
       (11, 12,
       'Wow. Can we make it a different moment?',
       '2016-06-22 19:18:15'),
       (12, 11,
       'Nope.',
       '2016-06-22 19:18:17'),

       (15, 13,
       'I. DECLARE. BANKRUPTCY!',
       '2015-11-02 13:10:25'),
       (13, 15,
       'I just wanted you to know that you can''t just say the word ''bankruptcy'' and expect anything to happen.',
       '2015-11-02 23:10:25'),
       (15, 13,
       'I didn''t say it, I declared it.',
       '2015-11-02 24:00:00');
