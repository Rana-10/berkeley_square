# UK high-street / London agents and portals: design language

Method note: pages were fetched as text only (no CSS or rendering). Visual styling (fonts, colours, spacing) was NOT determinable from any fetch and is marked as inferred or as a gap. Hamptons returned HTTP 403. Foxtons /legal-and-compliance and Winkworth lettings-fees URLs (guessed) returned 404. Rightmove detail-page evidence is from 2020 redesign coverage and may be dated.

## What are the conventions for property listing grids and detail pages (image-first, caption underneath, key facts in a ruled list)?

### Takeaway
Portals use a dense, image-first card: photo carousel with count and floorplan icon, then price, address, type and a short summary, with agent logo and date beneath. Detail pages put photos above price and address, with floorplan as a first-class gallery. The "ruled list" of key facts is largely my inference; the sources confirm image-first ordering and bullet "Key features".

### Cited Findings
- Rightmove result cards: photo carousel with arrows and counter (e.g. "1/14"), photo-count icon, a floorplan/virtual tour icon with tooltip "Property has a floorplan". Below: price (with qualifier such as "Guide Price", or POA), address, property type, three unlabelled numbers (first appears to be bedrooms), short summary, optional "Key features" bullets, agent logo and name, "Added on"/"Reduced on" date, call button, email icon, Save. — [Rightmove search](https://www.rightmove.co.uk/property-for-sale/find.html?locationIdentifier=REGION%5E87490)
- Rightmove badges: "FEATURED PROPERTY", "Premium Listing", "New Home", "Guide Price", "POA". — same source
- Rightmove search controls: radius (1/4 mile to 40 miles), min/max price (£50k to £20m), beds (Studio to 10), property type dropdown, extra filters panel, Save Search, Create Alert; sort = Highest Price, Lowest Price, Newest Listed, Oldest Listed; "Map" toggle; numbered pagination (1-42); result count in header (60,518). — same source
- Rightmove detail page redesign (2020): photos moved above price and address; old tabs (Description, Floorplan, Map & Street View, Video Tour, etc.) removed in favour of scrolling with section icons; videos and virtual tours moved inside the photo gallery; heart icon to save; EPC and documents under "Read More"; single share icon. — [Patma](https://www.patma.co.uk/blog/2020/10/the-new-rightmove-page-layout/)
- Rightmove gallery: full-screen image/video gallery; main-page carousel reinstated after feedback; photos keep original proportions (portrait not cropped); floorplans have their own full-screen gallery switchable with photos in one click, plus a "mini-media" reel under key features; agent contact details/logo stay visible while scrolling and appear in galleries. Rightmove claims faster load and more enquiries (self-reported). One commentator thought the changes favoured agent promotion over buyers. — [Rightmove overseas page hub post and coverage via search](https://hub.rightmove.co.uk/your-new-rightmove-overseas-property-details-page/), [The Negotiator](https://thenegotiator.co.uk/rightmove-to-introduce-changes-to-agents-property-details-pages/)
- Zoopla homepage structure (from text): hero, "Discover towns and cities" location link grids by theme (city, coast, rural, popular) with for-sale/to-rent lists, three tool cards (affordability, instant valuation, My Home) with image + CTA, property-category lists, news cards with thumbnail/date/summary, agent business banner. Tools: mortgage and affordability calculators, travel-time search, EV charging filter. "Just ask Zoopla" prompt near top. — [Zoopla](https://www.zoopla.co.uk/)
- Savills does not show listings on its homepage; it links to grouped search pages (residential, commercial, rural by region). — [Savills](https://www.savills.com/)
- Dexters features curated collections as entry points: Historic London Houses, River Views, New Homes, Prime Central London, Parkside Property. — [Dexters](https://www.dexters.co.uk/)

### Inferences
- Convention to adopt: hero photo first, then price/address, then a short facts line (beds, baths, receptions, size, tenure/EPC/council tax band) ; a ruled (hairline-separated) definition list is a natural editorial rendering of the portals' "Key features" and fact rows but is not confirmed as their literal markup.
- "Caption underneath" matches the cards (price and address below the image); portals' text sits below the photo rather than overlaid.
- Floorplan icon on cards and a dedicated floorplan view are user expectations a bespoke site should replicate.
- Curated collections (Dexters) are a precedent for editorial, image-led grouping instead of filter-only browsing.

### Gaps
- Actual typography, colours, grid column counts and spacing of all sites: not available from text fetches.
- Current (2024-26) Rightmove/Zoopla detail pages: only 2020 coverage found; Zoopla detail page not fetched.
- Hamptons: 403, nothing retrieved. No evidence found on its listing/detail design.
- Meaning of Rightmove's three card numbers (likely beds/baths/reception) is unconfirmed.

## How do lettings/property-management pages present services, fees and compliance?

### Takeaway
Fees and compliance are driven by law: fee lists must be published alongside statements on client money protection and redress scheme membership. Firms typically present these as plain text with scheme names/certificates, often on dedicated pages. Services are presented by audience (Buy/Rent/Landlords/Sell).

### Cited Findings
- Statutory duty (Consumer Rights Act 2015, s.83): where an agent holds client money, the published fee list must include a statement on whether it is a member of a client money protection scheme; a redress scheme statement must give the scheme's name. These are required in branch, on the agent's own website and on third-party sites used to advertise lets (a link to the agent's site is permitted). Certificates must be displayed in branches and published on the website, and supplied free on request. Clients must be told in writing within 14 days if CMP membership is revoked or changed. — [Business Companion](https://www.businesscompanion.info/en/quick-guides/services/letting-agents-display-of-fees), [legislation.gov.uk s.83](https://www.legislation.gov.uk/ukpga/2015/15/section/83/data.htm). Note: Business Companion has a Renters' Rights Act 2025 section; rules may have shifted, verify on live GOV.UK.
- Reeds Rains states it is an ARLA Propertymark member, makes CMP certificates available on its website and in branch, and points to Propertymark's "find agent" tool for verification. — [Reeds Rains](https://www.reedsrains.co.uk/landlords/client-money-protection)
- Paul Lee & Company names The Property Ombudsman as redress provider alongside Propertymark membership (agency page). — [Paul Lee & Co](https://www.paulleeco.com/landlords)
- Foxtons nav groups "Help for Landlords", "Specialist Lets", "Legal & Compliance" and promotes a Renters' Rights Act piece to landlords; homepage "When you need experts" uses four stat-led blocks (letting, selling, renting, buying) each with a CTA. — [Foxtons](https://www.foxtons.co.uk/)
- Winkworth: "Property support, tailored to you" cards for Buy, Sell, Rent, Landlords; MyWinkworth account sign-up. — [Winkworth](https://www.winkworth.co.uk/)
- Dexters: sellers/landlords pages cover free valuations, property management, block management, short lets, Renters Rights Act; valuation booking calendar; phone line 8am-8pm, 7 days. — [Dexters](https://www.dexters.co.uk/)
- Foxtons and Winkworth both run logged-in account products (My Foxtons: e-signing, one-click offers, rental alerts; MyWinkworth). — sources above

### Inferences
- A property-management site should have a plain, openly typeset fees page (ruled table, no card boxes) with a CMP and redress statement adjacent, certificates downloadable.
- Services by audience (landlord / tenant / block / freeholder) mirrors incumbent navigation.

### Gaps
- Actual fee-page layouts of Foxtons/Winkworth/Hamptons not retrieved (404/403).
- No dedicated property-management (block management) specialist sites examined in depth.

## What trust/regulatory elements are standard in UK footers and headers?

### Takeaway
Footers carry dense link columns, legal/policy links and, for lettings, memberships (ARLA Propertymark, TPO/redress, CMP). Large firms in practice show fewer badges in text-extractable form; trust is often expressed via review scores and stats in the body. Which badges appear as images could not be verified.

### Cited Findings
- Foxtons: footer columns About us / Our Services / Customer Service / Other Enquiries, Careers, Press; no ARLA/TPO/CMP text visible (image badges, if any, unverifiable). Trust: 4.50 rating from 8,756 reviews (structured data), "96% asking price", founded 1981, opening-hours table, office locator. — [Foxtons](https://www.foxtons.co.uk/)
- Winkworth: "190 years of heritage", "100+ proprietor led offices", "175,000 registered buyers & tenants", 4.8/5 Google rating, named dated client reviews; footer not captured. — [Winkworth](https://www.winkworth.co.uk/)
- Knight Frank: footer governance links include "Client money protection", fraud protection, tax principles; legal links terms, privacy, cookies, modern slavery; no RICS/TPO text seen; hero stats 130 years, 600+ offices, 20,000+ experts. — [Knight Frank](https://www.knightfrank.com/)
- Savills: footer columns (regions, services, About, More information, Talk to us) and statement that Savills plc subsidiaries are partly regulated by the FCA. — [Savills](https://www.savills.com/)
- Dexters footer: popular searches, offices, careers, press, complaints procedure, cookie policy, modern slavery statement, tax strategy. — [Dexters](https://www.dexters.co.uk/)
- Zoopla: parent Houseful named in structured data; dated market commentary as freshness signal. — [Zoopla](https://www.zoopla.co.uk/)
- Legal obligation for CMP/redress statements (see previous section) means CMP/TPO/Propertymark marks are effectively standard for lettings firms.

### Inferences
- Expected footer set: office address and company number/registered office, ARLA Propertymark, TPO (or PRS), CMP provider and certificate link, RICS (if regulated), complaints procedure, privacy/cookies, modern slavery, ICO registration. This list is from sector knowledge plus the legal sources above, not a verified audit of each site.
- Trust in header: phone number with hours, valuation CTA, branch finder, account sign-in.

### Gaps
- No verified image-badge inventory for any site (alt text absent in fetches).
- Hamptons footer unknown.

## How do they handle gallery/photography sections?

### Takeaway
Galleries are full-screen, keep original aspect ratios, merge video/virtual tour into the same viewer, and treat floorplans as a peer media type. Agent sites (Knight Frank, Savills) use large full-width photography with alternating text blocks.

### Cited Findings
- Rightmove: full-screen gallery, carousel on page, original proportions, floorplan gallery switch, mini-media reel, persistent agent contact. — see first section sources
- Knight Frank homepage: three full-width photographic feature blocks with overlaid copy and CTAs; decorative photos with empty alt, content photos with descriptive alt text. — [Knight Frank](https://www.knightfrank.com/)
- Savills: alternating sections of bold heading, short paragraph, CTA link, image slot; "Insight & Opinion" carousel of dated, categorised cards. — [Savills](https://www.savills.com/)
- Winkworth: split image block ("Experience that matters") and article sections. — [Winkworth](https://www.winkworth.co.uk/)
- Foxtons content tiles link to blog, local life, interiors. — [Foxtons](https://www.foxtons.co.uk/)

### Inferences
- Open editorial pattern: full-bleed lead image, then a 2-up/3-up asymmetric grid with captions below (price/address/type), no boxes; floorplan shown as its own labelled section or toggle; lightbox preserving aspect ratio.
- Stat rows (years, offices, rating) rendered as ruled figures rather than cards, as Knight Frank/Winkworth do conceptually.
- Team/agent pages: not researched (see gap).

### Gaps
- Team/agent page layouts for any firm not retrieved.
- Typography/colour of all sites unknown. General impression (serif/sans pairings, navy/green palettes) was not sourced and is deliberately omitted.
