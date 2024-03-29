﻿import { getModule, Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "../store";

import { serverAPI } from "@/common/store/internal/api";
import { UserModels } from "@/common/models/userModels";
import { ErrorModels } from "@/common/models/commonModels";

@Module({
    namespaced: true,
    dynamic: true, // not sure it needs to be...
    name: "userModule", // naming this module a particular thing
    store: store
})
class UserModule extends VuexModule {
    profile: UserModels.IUserProfile | null = null;

    @Mutation setProfile(profile: UserModels.IUserProfile) {
        this.profile = profile;
    }

    /* Attempt login, return error message if we get one. */
    @Action
    async loginByEmailPassword(emailPassword: UserModels.EmailPassword): Promise<(ErrorModels.AuthError | null)> {
        try {
            let err = await serverAPI.authService.loginUserByEmailPassword(emailPassword);
            return null;
        }
        catch (error) {
            return error.message;
        }
    }
    
    @Action
    logout(): void {
        this.context.commit("setProfile", null);
        serverAPI.authService.signOut();
    }
}
export default getModule(UserModule);
