# Design language of UK heritage / prime-property agency websites (Savills, Knight Frank, Strutt & Parker, Carter Jonas, Cluttons, Chestertons, Jackson-Stops)

Method note: WebFetch returns text/markup only. It gave NO fonts, colours, spacing or rendered imagery for any site. Anything about styling below is labelled "inferred". Cluttons.com, chestertons.co.uk and jackson-stops.co.uk returned HTTP 403; chestertons.com is the global-network site, not the UK agency. Cluttons and Jackson-Stops structure is therefore unverified.

## What are the recurring layout patterns across these sites?

### Takeaway
Verified structure is consistent: a thin utility bar (valuation / sign in), a 5-6 item mega-menu, a hero with property search or a property-type entry, then service/sector tiles, a proof/stats strip, an insight/article feed, and a multi-column footer with regulatory text. Visual treatment (serif/sans, palette, grid) could not be verified from fetched text.

### Cited Findings
- Savills header: logo, location/language selector, "Book a valuation", site search, "My Account", and six menu items (Find a property, Market your property, Find a service, Why Savills, Insight & Opinion, Contact us). Body order: testimonial banner ("Put your home in expert hands"), "Here to help you thrive" with three pillars, valuation CTA, Portfolio by Savills promo, "Servicing the full real estate life cycle" with stats, "How can we help?" prompt, Insight & Opinion feed with newsletter. No visible search bar in the homepage body. Sentence-case headings. — [Savills](https://www.savills.co.uk)
- Knight Frank: top bar ("Book a valuation", "Sign in", Residential/Commercial switch, market selector); full-width house-on-a-hill hero "Find your next property" with UK/Worldwide and Buy/Rent controls; a tile carousel of property types/lifestyle features (New homes, Coastal, Farm houses, Period homes, Mews, Thameside, Swimming pool); five mega-menu groups (Find a property, Sell or let, Services, People & offices, Insights); valuation CTA; service cards (Buyers, Sellers, Landlords, Tenants, Homeowners); "Dream properties"; testimonial; "The Knight Frank difference" stats; The View feature; dated "Latest insights"; contact form; footer columns (About, Market insights, Tools and guides, Governance, Fees & charges). — [Knight Frank](https://www.knightfrank.co.uk)
- Strutt & Parker (pre-rebrand site as fetched): two-tier nav (Our Offices, Our People, Contact, Careers, About; Find / Sell / Let a Property, Our Services, Blog); green-toned hero "For the people who are dreaming of a greener home" with Book now; "Find your next property" panel with tabs (Residential, Estates, Farms and Land, Commercial Lettings) and For Sale/To Rent toggle; "Property is personal" and four service cards (Residential, New Homes, National Country House Department, Estates Farms & Land); eight featured listings with photo, title, bedrooms, short description, guide price (~£1.1m to £17.95m); testimonial; five-card service grid; repeated search; blog/"Inspire" cards; footer with BNP Paribas links. — [Strutt & Parker](https://www.struttandparker.com)
- Carter Jonas: hero titled "Find a property" on a grey-violet background image (per file name) with four property-type links (Homes; Commercial; Farms, estates & rural leisure; Development land) and buy/rent toggle; centred logo in main menu with top bar (About, Careers, Search); six sector tiles with images and "View sector" links (Residential, Farms/Estates/Rural Leisure, Commercial, Planning & Development, Energy, Infrastructure); stat strip; six insight cards with sector label, title, "Find out more"; footer with four link groups (How we can help, Our Partnership, Research & insights, Credentials) and a legal row (cookies, complaints procedure, sitemap, accessibility, cyber alerts). — [Carter Jonas](https://www.carterjonas.co.uk)
- Chestertons (global site, .com): header with currency switcher; headline "Two centuries of Real Estate expertise in one search." over a video banner; office-location search; "Discover Our Global Network"; six featured properties showing price, beds, baths, area with "View More"; three value-prop cards; two news stories; mission quote; footer with Dubai and London (Mayfair) addresses and eight services. Nav: Global Properties, Global Network (mega menu by region), Services, Media, About Us, Get In Touch. This is a franchise/network site, not the UK consumer site. — [Chestertons](https://www.chestertons.com)

### Inferences
- Common skeleton: utility bar > mega-menu > hero + search/type-entry > service tiles > proof strip > insight feed > legal-heavy footer. Valuation CTA is always prominent (Savills, Knight Frank, S&P).
- Search is either hero-embedded (Knight Frank, S&P, Carter Jonas) or hidden behind nav (Savills), so a design can choose either.
- Entry by lifestyle/property type (Knight Frank tiles; Carter Jonas sector tiles) rather than by form fields is a recurring editorial device.

### Gaps
- Cluttons and Jackson-Stops homepages could not be fetched (403); their section order is not verified. Chestertons UK site also blocked.
- Grid, whitespace, column counts and breakpoints are not observable from text.

## How do they present services/departments and property listings (captions beneath images, ruled lists, numbered rows)?

### Takeaway
Fetched text confirms services appear as card/tile sets (4-6 items) and listings as image + title + beds + short description + guide price. Whether captions sit beneath images, or rows are ruled/numbered, cannot be verified from text.

### Cited Findings
- S&P featured listings: eight items, each with photo, title, bedroom count, short description and guide price. — [Strutt & Parker](https://www.struttandparker.com)
- S&P services shown twice: four cards, then five-card grid (buying, renting, estates and land, new homes, Private Client Department). — [Strutt & Parker](https://www.struttandparker.com)
- Carter Jonas sectors: six image tiles with "View sector" text links; insights as cards with sector label above title. — [Carter Jonas](https://www.carterjonas.co.uk)
- Knight Frank services: five audience cards (Buyers, Sellers, Landlords, Tenants, Homeowners); property-type discovery via a carousel of named tiles. — [Knight Frank](https://www.knightfrank.co.uk)
- Chestertons listings carry price, beds, baths, floor area and a "View More" link. — [Chestertons](https://www.chestertons.com)
- Shape Works describes the Cluttons design refresh as covering navigation, property search, valuation form and homepage (no visual detail; page undated, copyright 2023, asset paths suggest 2026). — [Shape Works](https://shape.works/case-study/cluttons)

### Inferences
- These sites largely use card grids; a "no text-in-card" approach (image-led tiles with caption below, ruled lists, numbered rows) would be a deliberate departure, not something these sites demonstrably do. Data fields to reuse: audience-based services (Buyers/Sellers/Landlords/Tenants), sector label + title + link, and listing = image, title, beds, one-line description, guide price.
- Labelled meta (sector label, "Guide price", bedrooms) maps naturally to caption-below and ruled-row treatments (design suggestion, not observed).

### Gaps
- No rendered view of any site; caption placement, rules, numbering, hover states unverified. A screenshot-capable tool or manual review is needed.

## What type and colour choices signal tradition and trust?

### Takeaway
Only the Strutt & Parker rebrand gives sourced palette information: deep claret, monochromatic, "discerning and timeless", with a heritage tagline. Typefaces for all seven brands are unverified.

### Cited Findings
- S&P 2026 rebrand: new logo with ampersand retained in a reimagined wordmark; red box removed; deep claret introduced for a more premium position; wider palette "refined, balanced, monochromatic"; tagline "Land and property. Since 1885."; new website promised "this summer" with improved search, redeveloped content and client portal; offices being redesigned. Typography not mentioned. — [S&P press release](https://www.struttandparker.com/about-strutt-parker/corporate-news/strutt-and-parker-unveils-significant-rebrand); trade coverage: [Estate Agent Today](https://www.estateagenttoday.co.uk/breaking-news/2026/04/historic-estate-agency-unveils-modern-rebrand/)
- S&P's fetched (pre-relaunch) homepage used a green-toned hero and "greener home" messaging; may be superseded by the rebrand. — [Strutt & Parker](https://www.struttandparker.com)
- Cluttons 2014 identity by Industry: clean white wordmark with wide letter spacing; moved away from bright red signage; green avoided because it is tied to Foxtons. — [Communicate Magazine](https://www.communicatemagazine.com/news/2014/1402-property-rebrand-evokes-luxury-and-ease) (2014, may be outdated)
- Carter Jonas historic brand known for red and green (2009); 2014 refresh by NextBigThing. Current palette not confirmed. — [Carter Jonas 2009](https://static2.carterjonas.co.uk/news-and-events/archive/february-09/carter-jonas-rebrands), [2014](https://carterjonas.co.uk/news-and-events/archive/sep-14/brand-refresh-press-release)
- Knight Frank: a Red Brick Road project used "typographical design elements within existing brand colours and fonts" (fonts unnamed, ~2021). — [Red Brick Road](https://www.redbrickroad.com/knight-frank-your-partners-in-property/)
- Savills headings are sentence case (observed from text). — [Savills](https://www.savills.co.uk)

### Inferences
- Direction of travel (S&P) is toward deeper, restrained single-hue palettes (claret) replacing bright corporate accents, with heritage dates in taglines.
- Serif/sans pairings are commonly assumed for the sector but I did not verify any site's fonts; do not treat as fact.

### Gaps
- No font names, hex values, type scale or casing (other than Savills' sentence-case headings) verified for any site. Needs devtools/CSS inspection or brand-guideline pages (none found).

## How are imagery and architecture (Georgian terraces, stucco, brick, townhouses, countryside estates) used and cropped?

### Takeaway
Little verifiable. Knight Frank's hero is a full-width house on a hill and its tiles are lifestyle/architecture categories; others use property-type or sector imagery. Cropping and ratios unknown.

### Cited Findings
- Knight Frank hero: full-width image of a house on a hill; tiles include Period homes, Mews, Thameside, Coastal, Farm houses. — [Knight Frank](https://www.knightfrank.co.uk)
- Carter Jonas sector tiles use images; hero background image named "greyviolet-background" (file name only). — [Carter Jonas](https://www.carterjonas.co.uk)
- Chestertons uses a video banner and international (Cayman, France, St Vincent) properties. — [Chestertons](https://www.chestertons.com)
- S&P rebrand includes magazine and out-of-home ads; "discerning and timeless look and feel". — [S&P press release](https://www.struttandparker.com/about-strutt-parker/corporate-news/strutt-and-parker-unveils-significant-rebrand)
- Fourwalls redesigned S&P brochures/emails considering layout, typography and imagery (no specifics). — [Fourwalls](https://fourwalls-group.com/blog/strutt-parker-email-and-brochure-redesign/)

### Inferences
- Labels such as Period homes, Mews and Thameside show the sector markets by architectural typology; a Georgian terrace / stucco / brick / estate taxonomy would fit that convention.

### Gaps
- Photography style, crop ratios, grading and specific architecture not verifiable via text fetch; no design-review (Awwwards/Behance) coverage found for any of the seven.

## Trust signals and footers (RICS, accreditation, heritage dates)

### Takeaway
All use heritage dates and scale numbers plus regulatory footers (RICS/FCA/client money protection).

### Cited Findings
- Savills: 170+ years; 42,000+ staff, 70+ countries; FTSE 250; FCA and RICS regulation references; client money protection; awards; fraud alerts; testimonials; footer columns by residential/commercial/rural/auctions/international/offices plus a legal registration statement. A "300+ offices" figure was flagged by the fetch as inconsistently labelled. — [Savills](https://www.savills.co.uk)
- Knight Frank: 130 years, 600+ offices worldwide, 50+ UK offices, 20,000+ staff; Trustpilot; RICS valuation references; client money protection; 2026 copyright. — [Knight Frank](https://www.knightfrank.co.uk)
- S&P: "Since 1885"; BNP Paribas ownership; 50+ offices; FCA authorisation reference; client money protection; redress scheme; page copy inconsistent ("over 135 years" vs "over 140 years"). — [Strutt & Parker](https://www.struttandparker.com)
- Carter Jonas: established 1855, 170+ years; 4.7 Google rating; 9,500+ active buyers/tenants; 9/10 would recommend; credential logos RICS, RTPI, Property Ombudsman, ARLA; footer "Credentials" group. — [Carter Jonas](https://www.carterjonas.co.uk)
- Chestertons: founded 1805, "two centuries"; ~22 countries; Chestertons Foundation badges. — [Chestertons](https://www.chestertons.com)

### Inferences
- Pattern: a 3-4 figure stat strip (years, offices, staff, rating) plus a credentials row of accreditation marks.

### Gaps
- Cluttons and Jackson-Stops trust content unverified (403). Do not assume their founding dates from this research.
