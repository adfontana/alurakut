import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import { AlurakutMenu } from '../src/lib/AlurakutCommons';
import { MainArea } from '../src/components/MainArea';
import { ProfileSidebar } from '../src/components/ProfileSidebar';
import { RelationsArea } from '../src/components/RelationsArea';
import { getFollowers } from '../src/services/github.service';
import { getList } from '../src/services/community.service';
import { userAuthenticated } from '../src/services/alurakut.service';
import 'font-awesome/css/font-awesome.min.css';

export default function Home(props) {
  const user = props.githubUser;
  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(function () {
    // Set followers list
    getFollowers(user)
      .then(followers => setSeguidores(followers));
    // Set communities list
    getList()
      .then(communities => setComunidades(communities));
  }, [])

  return (
    <>
      {/* Topbar menu */}
      <AlurakutMenu githubUser={user} />

      <MainGrid>

        {/* Sidebar */}
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={user} />
        </div>

        {/* Main area */}
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <MainArea communities={comunidades} setCommunities={setComunidades} creatorSlug={user} />
        </div>

        {/* Relations area */}
        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <RelationsArea communities={comunidades} followers={seguidores} />
        </div>

      </MainGrid>
    </>
  )
}

/*
 * Server side user validation
 */
export async function getServerSideProps(context) {
  // Get the cookies in the browser
  const cookies = nookies.get(context)
  // Get the user token stored in the cookies browser
  const token = cookies.USER_TOKEN;
  // Check if it's a valid token
  const isAuthenticated = await userAuthenticated(token);
  // If is not a valid token, redirect to the login page
  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  // If is a valid token, get the user information
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken?.githubUser;
  
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}