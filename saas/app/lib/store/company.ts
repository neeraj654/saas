import { action, computed, IObservableArray, observable, runInAction, makeObservable } from 'mobx';
import Router from 'next/router';
import {
  cancelSubscriptionApiMethod,
  inviteMemberApiMethod,
  removeMemberApiMethod,
  updateTeamApiMethod,
} from '../api/team-leader';

import { Store } from './index';
import { User } from './user';
import { Invitation } from './invitation';

class Comapny {
  public store: Store;

  public _id: string;
  public teamLeaderId: string;

  public name: string;
  public slug: string;
  public avatarUrl: string;
  public memberIds: IObservableArray<string> = observable([]);
  public members: Map<string, User> = new Map();
  public invitations: Map<string, Invitation> = new Map();

  public stripeSubscription: {
    id: string;
    object: string;
    application_fee_percent: number;
    billing: string;
    cancel_at_period_end: boolean;
    billing_cycle_anchor: number;
    canceled_at: number;
    created: number;
  };
  public isSubscriptionActive: boolean;
  public isPaymentFailed: boolean;

  constructor(params) {
    makeObservable(this, {
      name: observable,
      slug: observable,
      avatarUrl: observable,
      memberIds: observable,
      members: observable,
      invitations: observable,
      setInitialMembersAndInvitations: action,
      updateTheme: action,
      inviteMember: action,
      removeMember: action,
    });

    this._id = params._id || '';
    this.teamLeaderId = params.teamLeaderId || '';
    this.slug = params.slug || '';
    this.name = params.name || '';
    this.avatarUrl = params.avatarUrl || '';
    this.memberIds.replace(params.memberIds || []);

    this.stripeSubscription = params.stripeSubscription || {
      id: '',
      object: '',
      application_fee_percent: 0,
      billing: '',
      cancel_at_period_end: false,
      billing_cycle_anchor: 0,
      canceled_at: 0,
      created: 0,
    };
    this.isSubscriptionActive = params.isSubscriptionActive || true;
    this.isPaymentFailed = params.isPaymentFailed || false;

    this.store = params.store;
  }

  public setInitialMembersAndInvitations(users, invitations) {
    this.members.clear();
    this.invitations.clear();

    for (const user of users) {
      if (this.store.currentUser && this.store.currentUser._id === user._id) {
        this.members.set(user._id, this.store.currentUser);
      } else {
        this.members.set(user._id, new User(user));
      }
    }

    for (const invitation of invitations) {
      this.invitations.set(invitation._id, new Invitation(invitation));
    }

    // console.log(this.members);
  }

  public async updateTheme({ name, avatarUrl }: { name: string; avatarUrl: string }) {
    try {
      const { slug } = await updateTeamApiMethod({
        teamId: this._id,
        name,
        avatarUrl,
      });

      runInAction(() => {
        this.name = name;
        this.avatarUrl = avatarUrl;
        this.slug = slug;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async inviteMember(email: string) {
    try {
      const { newInvitation } = await inviteMemberApiMethod({ teamId: this._id, email });

      runInAction(() => {
        this.invitations.set(newInvitation._id, new Invitation(newInvitation));
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async removeMember(userId: string) {
    try {
      await removeMemberApiMethod({ teamId: this._id, userId });

      runInAction(() => {
        this.members.delete(userId);
        this.memberIds.remove(userId);
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public changeLocalCache(data) {
    this.name = data.name;
    this.memberIds.replace(data.memberIds || []);
  }

  public async cancelSubscription({ teamId }: { teamId: string }) {
    try {
      const { isSubscriptionActive } = await cancelSubscriptionApiMethod({ teamId });

      runInAction(() => {
        this.isSubscriptionActive = isSubscriptionActive;
      });
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  public async checkIfTeamLeaderMustBeCustomer() {
    let ifTeamLeaderMustBeCustomerOnClient: boolean;

    if (this && this.memberIds.length < 2) {
      ifTeamLeaderMustBeCustomerOnClient = false;
    } else if (this && this.memberIds.length >= 2 && this.isSubscriptionActive) {
      ifTeamLeaderMustBeCustomerOnClient = false;
    } else if (this && this.memberIds.length >= 2 && !this.isSubscriptionActive) {
      ifTeamLeaderMustBeCustomerOnClient = true;
    }

    return ifTeamLeaderMustBeCustomerOnClient;
  }
}

export { Comapny };
