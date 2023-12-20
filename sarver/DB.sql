(1) users_and_admins
CREATE TABLE IF NOT EXISTS public.users_and_admins
(
    user_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000000 CACHE 1 ),
    user_type text COLLATE pg_catalog."default" NOT NULL,
    user_name text COLLATE pg_catalog."default" NOT NULL,
    user_phone text COLLATE pg_catalog."default" NOT NULL,
    user_email text  COLLATE pg_catalog."default" NOT NULL,
    user_password text COLLATE pg_catalog."default" NOT NULL,
    user_image text COLLATE pg_catalog."default" NOT NULL,
    user_forgot_password text COLLATE pg_catalog."default",
    user_flags integer NOT NULL,
    CONSTRAINT users_admins_pk PRIMARY KEY (user_id)
)

(2) contact_us_message
CREATE TABLE IF NOT EXISTS public.contact_us_message
(
    contact_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 1000000 CACHE 1 ),
    user_name text COLLATE pg_catalog."default" NOT NULL,
    user_email text COLLATE pg_catalog."default" NOT NULL,
    user_message text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT contact_pk PRIMARY KEY (contact_id)
)

(3) contact_data
CREATE TABLE IF NOT EXISTS public.contact_data
(
    our_phone text COLLATE pg_catalog."default" NOT NULL,
    our_email text COLLATE pg_catalog."default" NOT NULL,
    our_location text COLLATE pg_catalog."default" NOT NULL
)

(4) about_us
CREATE TABLE IF NOT EXISTS public.about_us
(
    about_description text COLLATE pg_catalog."default" NOT NULL,
    about_title text COLLATE pg_catalog."default" NOT NULL,
    about_image_no_one text COLLATE pg_catalog."default" NOT NULL,
    about_image_no_two text COLLATE pg_catalog."default" NOT NULL,
    about_image_no_three text COLLATE pg_catalog."default" NOT NULL
)

(5) niversity_data
CREATE TABLE IF NOT EXISTS university_data
(
    university_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000000 CACHE 1 ),
    university_name text COLLATE pg_catalog."default" NOT NULL,
    university_description text COLLATE pg_catalog."default" NOT NULL,
    university_image text COLLATE pg_catalog."default",
    university_email text COLLATE pg_catalog."default" NOT NULL,
    university_location text COLLATE pg_catalog."default" NOT NULL,
    number_of_majors integer NOT NULL,
    university_phone integer NOT NULL,
    university_image1 text COLLATE pg_catalog."default",
    CONSTRAINT university_id_pk PRIMARY KEY (university_id)
)

(6)street_data
CREATE TABLE IF NOT EXISTS street_data
(
    street_id integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 0 MINVALUE 0 MAXVALUE 10000000 CACHE 1 ),
    university_id integer NOT NULL,
    starting_place text COLLATE pg_catalog."default" NOT NULL,
    departure_time time without time zone NOT NULL,
    CONSTRAINT street_id_pk PRIMARY KEY (street_id),
    CONSTRAINT university_id_fk FOREIGN KEY (university_id)
        REFERENCES public.university_data (university_id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
)