import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

export function ProfileRelationsBox(properties) {

  function getItems() {
    return properties.items.slice(0, 6).map((item) => {
      return (
        <li key={item.key}>
          <a href={item.href}>
            <img src={item.img} />
            <span>{item.span}</span>
          </a>
        </li>
      )
    })
  }

  function seeAll() {
    if (properties.items.length > 6) {
      return (
        <>
          <hr></hr>
          <a>Ver todos</a>
        </>
      )
    }
    return '';
  }

  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {properties.title} ({properties.items.length})
      </h2>
      <ul>{getItems()}</ul>
      {seeAll()}
    </ProfileRelationsBoxWrapper>
  )
}