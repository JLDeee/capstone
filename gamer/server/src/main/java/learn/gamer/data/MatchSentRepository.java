package learn.gamer.data;

import learn.gamer.models.MatchSent;

public interface MatchSentRepository {
    MatchSent findByGamerSenderId(int gamerSenderId);

    boolean add(MatchSent matchSent);

    boolean deleteByKey(int matchSenderId, int matchReceiverId);
}
