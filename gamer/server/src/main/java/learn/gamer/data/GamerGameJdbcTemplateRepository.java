package learn.gamer.data;

import learn.gamer.models.Game;
import learn.gamer.models.GamerGame;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class GamerGameJdbcTemplateRepository implements GamerGameRepository {
    private final JdbcTemplate jdbcTemplate;

    public GamerGameJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public boolean add(GamerGame gamerGame) {
        final String sql = "insert into gamer_game (gamer_id, game_id) values (?,?);";
        return jdbcTemplate.update(sql,
                gamerGame.getGamerId(),
                gamerGame.getGame().getGameId()) > 0;
    }

    @Override
    public boolean deleteByKey(int gamerId, int gameId) {
        final String sql = "delete from gamer_game "
                + "where gamer_id = ? and game_id = ?;";

        return jdbcTemplate.update(sql, gamerId, gameId) > 0;
    }
}
