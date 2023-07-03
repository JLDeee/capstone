package learn.gamer.data;

import learn.gamer.models.GamerGame;

public interface GamerGameRepository {
    boolean add(GamerGame gamerGame);

    boolean deleteByKey(int gamerId, int gameId);
}
