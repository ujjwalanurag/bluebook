class User < ApplicationRecord 
    validates :email, :password_digest, :session_token, :first_name, :surname, :birthday, :gender, presence: true
    validates :email, uniqueness: true 
    validates :password, length: { minimum: 6, allow_nil: true }

    has_one_attached :profile_pic
    has_one_attached :cover_pic

    has_many :authored_posts,
        primary_key: :id,
        foreign_key: :author_id,
        class_name: 'Post'

    has_many :received_posts,
        primary_key: :id,
        foreign_key: :for_user_id,
        class_name: 'Post'

    attr_reader :password

    after_initialize :ensure_session_token 
    
    def self.find_by_credentials(email, password)
        user = User.find_by(email: email)
        return nil unless user && user.is_password?(password)
        user
    end 

    def self.generate_session_token
        SecureRandom.urlsafe_base64(16)
    end 

    def reset_session_token
        self.session_token = User.generate_session_token
        self.save!
        self.session_token
    end 

    def is_password?(password)
        bcrypt_password_digest = BCrypt::Password.new(self.password_digest)
        bcrypt_password_digest.is_password?(password)
    end 

    def password=(password)
        @password = password 
        self.password_digest = BCrypt::Password.create(password)
    end 

    private
    def ensure_session_token
        self.session_token ||= User.generate_session_token
    end 
end 