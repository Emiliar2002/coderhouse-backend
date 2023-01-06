class AuthService{
    constructor(){}

    
    isAuthenticated(req){
        const {user} = req.session
        if(user){
            return {
                success: true,
                data: `Already authenticated ${user}`
            }
        }
        return {
            success: false,
            data: `Not authenticated`
        }
    }

    login(req, newUser = 'guest' + randomXToY(1, 999)){

        const isAuthenticated = this.isAuthenticated(req)

        if(isAuthenticated.success){
            return {
                success: false,
                data: isAuthenticated.data
            }
        }

        req.session.user = newUser

        return {
            success: true,
            data: `Logged in as ${newUser}`
        }

    }

}

function randomXToY(minVal,maxVal){
  const randVal = minVal+(Math.random()*(maxVal-minVal));
  return Math.round(randVal);
}

module.exports = AuthService