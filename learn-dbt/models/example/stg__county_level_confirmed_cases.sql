{{ config(materialized='table') }}

with

raw as (
  select
      last_update
    , location_type
    , state
    , county_name
    , county_name_long
    , fips_code
    , lat
    , lon
    , NCHS_urbanization
    , cast(total_population as integer) as total_population
    , confirmed
    , confirmed_per_100000
    , deaths
    , deaths_per_100000

  from {{ source('covid', 'county_level_confirmed_cases') }}
)

select * from raw
