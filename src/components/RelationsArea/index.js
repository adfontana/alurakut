import { ProfileRelationsBox } from "../ProfileRelationsBox";

export function RelationsArea({ followers, communities }) {

    const favoritePeople = [
        'vanessakoch',
        'danielbraghini',
        'henriquesandri',
        'andrebraghini',
        'igsrc',
        'felipefialho',
    ]

    function getGithubItens(items) {
        return items.map(item => {
            return {
                key: item,
                href: `/users/${item}`,
                img: `https://github.com/${item}.png`,
                span: item
            };
        });
    };

    function getCommunitiesItens() {
        return communities.map(item => {
            return {
                key: item.id,
                href: `/communities/${item.id}`,
                img: item.imageUrl,
                span: item.title
            };
        });
    }

    return (
        <>
            <ProfileRelationsBox title="Seguidores" items={getGithubItens(followers)} />
            <ProfileRelationsBox title="Comunidades" items={getCommunitiesItens()} />
            <ProfileRelationsBox title="Pessoas da comunidade" items={getGithubItens(favoritePeople)} />
        </>
    );
}
