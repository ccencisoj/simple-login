import agent from 'agent';

const getUser = async (ctx)=> {
  const response = await agent.User.current({
    headers: {cookie: ctx.req.headers.cookie}
  });

  if(response.error) 
    return null;

  return response.user;
}

const required = ()=> async (ctx)=> {
  const user = await getUser(ctx);

  if(user && user.isDev)
    return {
      props: {user},
      redirect: {destination: "/dev"}
    }

  if(user) 
    return {props: {user}};

  return {
    props: {},
    redirect: {destination: "/signIn"}
  };
}

const requiredDev = ()=> async (ctx)=> {
  const user = await getUser(ctx);

  console.log(user);

  if(user && user.isDev)
    return {props: {user}};

  return {
    props: {},
    redirect: {destination: "/signIn"}
  }
}

const check = ()=> async (ctx)=> {
  const user = await getUser(ctx);

  if(!user)
    return {props: {}};
  
  if(user.isDev)
    return {
      props: {user},
      redirect: {destination: "/dev"}
    }

  return {
    props: {user},
    redirect: {destination: "/profile"}
  };
}

export default { required, requiredDev, check };