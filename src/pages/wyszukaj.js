import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"

const SearchPage = ({ location }) => (
  <Layout>
    <SEO title={"Wyszukaj - " + location.state.searchPhrase} />
    <h1>{location.state.searchPhrase}</h1>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a congue
      odio, vitae egestas libero. Pellentesque eget felis non felis ultricies
      aliquet in ut risus. Suspendisse at nisl nec diam vulputate tincidunt.
      Phasellus commodo elit ac lacus rhoncus, non ullamcorper augue faucibus.
      Vestibulum a condimentum leo, in facilisis turpis. Duis faucibus est vel
      eros aliquet suscipit. Ut semper mi vel eros malesuada tempus. In quis
      dolor vel orci pharetra dignissim sed nec elit. Fusce ut justo congue
      augue iaculis bibendum. Donec vestibulum elementum ante, sit amet auctor
      mi porta eget. Quisque sagittis arcu risus, quis facilisis lectus bibendum
      quis. Duis accumsan a purus vel malesuada. Orci varius natoque penatibus
      et magnis dis parturient montes, nascetur ridiculus mus. Aliquam eget
      nulla ac ex vulputate scelerisque et quis felis. Quisque eu laoreet leo, a
      vulputate metus. Donec eu sodales nisi. Mauris molestie vehicula lectus,
      at commodo justo consectetur vel. Nullam non mauris sollicitudin, commodo
      diam nec, bibendum elit. Praesent in velit nibh. Duis in ipsum aliquam
      risus eleifend vulputate. Cras lacinia accumsan lorem, eu interdum odio
      mattis nec. Nulla ullamcorper id ex ut tincidunt. Proin enim elit,
      ullamcorper sed nibh eu, efficitur egestas dolor. Nullam rutrum enim vitae
      nisl iaculis tincidunt. Class aptent taciti sociosqu ad litora torquent
      per conubia nostra, per inceptos himenaeos. In non felis accumsan,
      imperdiet neque id, finibus libero. Class aptent taciti sociosqu ad litora
      torquent per conubia nostra, per inceptos himenaeos. Praesent ac orci sed
      lectus semper iaculis et at nunc. Fusce bibendum sem quis sem euismod,
      pharetra consequat urna malesuada. Suspendisse tincidunt enim nec elit
      posuere volutpat. Vivamus est turpis, eleifend lacinia est eget, varius
      lobortis nibh. Nam congue finibus quam vitae vulputate. Mauris pretium
      molestie lacinia. Maecenas ut dolor tempus, volutpat est at, blandit arcu.
      Nullam accumsan, nisi tincidunt egestas interdum, mauris ante placerat ex,
      ut aliquet lorem urna quis lectus. Nulla a condimentum neque, vitae
      vestibulum tortor. Interdum et malesuada fames ac ante ipsum primis in
      faucibus. Cras vulputate, enim sit amet facilisis porttitor, nulla nisl
      lacinia elit, at rhoncus lacus odio placerat eros. Nam ac quam sit amet
      mauris hendrerit elementum ac a odio. Vestibulum cursus lacus eu est
      pellentesque, rhoncus finibus nisl ultrices. Etiam a sem condimentum,
      dignissim massa ac, luctus quam. Sed fermentum a urna a sagittis. Cras
      posuere ligula sapien, a sagittis urna suscipit at. Sed non tortor eget
      felis commodo pulvinar a sit amet turpis. Cras elementum ex ac efficitur
      rhoncus. Vivamus elementum ligula venenatis leo congue, pretium
      pellentesque ligula sagittis. Suspendisse et viverra mi. Aliquam erat
      volutpat. Nunc vel ipsum vestibulum, consequat est id, placerat nulla.
      Cras ut libero a felis iaculis accumsan id volutpat felis. Mauris in
      tortor et lorem accumsan eleifend. Duis lobortis mauris pellentesque porta
      pretium. Donec blandit suscipit elit in imperdiet. Sed eu turpis ipsum.
      Sed interdum id urna at euismod.
    </p>
  </Layout>
)

export default SearchPage
