create table user (
user_id long,
user_name
PRIMARY KEY (user_id 
)


create table height (
height_id long,
user_id long FK,
value float not null,
entry_date date,
PRIMARY KEY (height_id),
user_height_fk FOREIGN KEY (user_id) REFERENCES user (user_id)
)

create table weight(
weight_id long,
user_id long FK,
value float not null,
entry_date date,
PRIMARY KEY (weight_id ),
user_weight_id _fk FOREIGN KEY (user_id) REFERENCES user (user_id)
)


create table bmi (
bmi_id long,
height_id  long FK,
weight_id long FK,
value float not null,
measure_date date,
PRIMARY KEY (bmi_id ),
bmi_height_id_fk FOREIGN KEY (height_id ) REFERENCES height (height_id ),
bmi_weight_id_fk FOREIGN KEY (weight_id  ) REFERENCES weight (weight_id),
)
