package learn.gamer.data;

import learn.gamer.models.Gamer;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

public interface GamerRepository {
    List<Gamer> findAll();

    Gamer findByGamerTag(String gamerTag);

    Gamer findByGameTitle(String gameTitle);

    Gamer create(Gamer gamer);

    @Transactional
    boolean update(Gamer gamer);
}
