import NextAuth from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import GithubProvider from 'next-auth/providers/github'
import CredentialsProvider from 'next-auth/providers/credentials';
import User from '../../../model/Schema';
import bcrypt from 'bcryptjs'

export default NextAuth({
    providers:[
        GoogleProvider({
            clientId:process.env.GOOGLE_CLIENT_ID as string,
            clientSecret:process.env.GOOGLE_CLIENT_SECRET as string
        }),
        GithubProvider({
            clientId:process.env.GITHUB_CLIENT_ID as string,
            clientSecret:process.env.GITHUB_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name:'Credentials',
            credentials:{
                email:{type:'email',placeholder:'email'},
                password:{type:'password',placeholder:'password'}
            },
            async authorize(credentials,req) {
                const user=await User.findOne({email:credentials?.email});

                if(!user) {
                    throw new Error('Invalid credentials')
                }

                const isPassCorrect=await bcrypt.compare(credentials?.password as string,user.password);
                if(!isPassCorrect) {
                    throw new Error('Invalid credentials')
                }

                return user;
            }
        })
    ]
})