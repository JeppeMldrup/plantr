package com.gardentally.API.Services;

import java.security.SecureRandom;

import org.springframework.stereotype.Service;

import com.gardentally.API.Entities.Garden;
import com.gardentally.API.Entities.Invite;
import com.gardentally.API.Repositories.InviteRepository;

@Service
public class InviteService {
    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static final int CODE_LENGTH = 6;
    private static final SecureRandom random = new SecureRandom();
    private final InviteRepository inviteRepository;

    public InviteService(InviteRepository inviteRepository){
        this.inviteRepository = inviteRepository;
    }

    private static String generateInviteCode() {
        StringBuilder code = new StringBuilder(CODE_LENGTH);
        for (int i = 0; i < CODE_LENGTH; i++) {
            int index = random.nextInt(CHARACTERS.length());
            code.append(CHARACTERS.charAt(index));
        }
        return code.toString();
    }

    public Invite getInviteCodeForGarden(Garden garden){
        var invites = inviteRepository.findAllByGarden(garden);

        if (!invites.isEmpty()){
            return invites.getFirst();
        }

        String inviteCode = generateInviteCode();
        while(inviteRepository.findById(inviteCode).isPresent()){
            inviteCode = generateInviteCode();
        }
        var invite = new Invite();
        invite.setGarden(garden);
        invite.setId(inviteCode);
        return inviteRepository.save(invite);
    }
}



