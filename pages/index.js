import React from "react";
import config from "../config.json";
import styled from "styled-components";
import { CSSReset } from "../src/components/CSSReset";
import Menu from "../src/components/Menu";
import { StyledTimeline } from "../src/components/TimeLine";


function HomePage() {
    const [valorFiltro, setValorFiltro] = React.useState("");

    return (
        <>
        <div style={{
            display: "flex",
            flexDirection: "column",
            flex: 1
        }}>
            {/* Prop Drilling */}
            <Menu valorFiltro={valorFiltro} setValorFiltro={setValorFiltro} />
            <Header />
            <TimeLine searchValue={valorFiltro} playlists={config.playlists} />
        </div>
        </>
    );
}

export default HomePage;


// function Menu() {
//     return (
//         <div>
//             Menu
//         </div>
//     );
// }


const StyledHeader = styled.div`
    background-color: ${({ theme }) => theme.backgroundLevel1};
    
    img {
        width: 80px;
        height: 80px;
        border-radius: 50%;
    }
    .user-info {
        display: flex;
        align-items: center;
        width: 100%;
        padding: 16px 32px;
        gap: 16px;
    }
`;
const StyledBanner = styled.div`
    background-color: #444;
    height: 230px;
    background-image: url(${({bg}) => bg});
`;
function Header() {
    return (
        <StyledHeader>
            <StyledBanner bg={config.bg} />
            <section className="user-info">
                <img src={`https://github.com/${config.github}.png`} />
                <div>
                    <h3>
                        {config.name}
                    </h3>
                    <p>
                        {config.job}
                    </p>
                </div>
            </section>
        </StyledHeader>
    );
}


function TimeLine({searchValue, ...props}) {
    const playlistNames = Object.keys(props.playlists);
    // Statement
    // Retorno por expressão
    return (
        <StyledTimeline>
            {playlistNames.map((playlistName) => {
                const videos = props.playlists[playlistName];
                // console.log(playlistName);
                // console.log(videos);
                return (
                    <section key={playlistName}>
                        <h2>{playlistName}</h2>
                        <div>
                            {videos.filter((video) => {
                                // Trata os dados para a pesquisa, independente de ser caixa alta ou baixa
                                const titleNormalized = video.title.toLowerCase();
                                const searchValueNormalized = searchValue.toLowerCase();
                                return titleNormalized.includes(searchValueNormalized);
                            }).map((video) => {
                                return (
                                    <a key={video.url} href={video.url}>
                                        <img src={video.thumb} />
                                        <span>
                                            {video.title}
                                        </span>
                                    </a>
                                )
                            })}
                        </div>
                    </section>
                )
            })}
        </StyledTimeline>
    )
}
