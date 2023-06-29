package learn.gamer.data;

import learn.gamer.models.Game;
import learn.gamer.models.Gamer;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GamerRepository {
    List<Gamer> findAll();

    Gamer findByGamerTag(String gamerTag);

    List<Gamer> findByGameTitle(String gameTitle);

    List<Gamer> findByGameId(int gameId);

    Gamer create(Gamer gamer);

    @Transactional
    boolean update(Gamer gamer);
}
