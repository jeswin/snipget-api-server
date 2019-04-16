-- user

CREATE TABLE public."user"
(
    "id" bigint NOT NULL,
    username character varying(32) NOT NULL,
    created_at bigint NOT NULL,
    updated_at bigint NOT NULL,
    name character varying(128) NOT NULL,
    email character varying(128) NOT NULL,
    PRIMARY KEY (id)
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public."user"
    OWNER to postgres;

-- credential

CREATE TABLE public.credential
(
    "id" bigint NOT NULL,
    user_id bigint NOT NULL,
    password character varying(256) COLLATE pg_catalog."default" NOT NULL,
    salt character varying(256) COLLATE pg_catalog."default" NOT NULL,
    PRIMARY KEY (id),
    CONSTRAINT credential_id_fkey FOREIGN KEY (user_id)
        REFERENCES public."user" (id) 
)
WITH (
    OIDS = FALSE
);

ALTER TABLE public.credential
    OWNER to postgres;
