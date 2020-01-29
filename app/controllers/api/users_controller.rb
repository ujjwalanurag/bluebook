class Api::UsersController < ApplicationController

    def create
        p params 
        @user = User.new(user_params)
        if @user.save
            login(@user)
            render '/api/users/show'
        else  
            render json: ['Invalid email/password'], status: 401
        end 
    end 

    private
    def user_params
        params.require(:user).permit(
            :first_name, 
            :surname, 
            :email, 
            :password,
            :birthday,
            :gender
        )
    end 
end 